import Task from '../models/task.model.js';
import Message from '../models/message.model.js';
import Project from '../models/project.model.js';
import User from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/v1/projects/:id/tasks - Get all tasks for a project
const getProjectTasks = asyncHandler(async (req, res) => {
  const { id: projectId } = req.params;
  const userId = req.user._id;
  const userRoles = req.user.roles;

  // First, verify the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Role-based access control
  // Client can only see tasks for their own projects
  // Admin can see tasks for all projects
  if (userRoles.includes('client') && !userRoles.includes('admin')) {
    if (project.client.toString() !== userId.toString()) {
      throw new ApiError(403, 'Access denied - You can only view tasks for your own projects');
    }
  }

  // Get all tasks for the project
  const tasks = await Task.find({ project: projectId })
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });

  // Format the response
  const formattedTasks = tasks.map(task => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    assignedTo: task.assignedTo ? {
      id: task.assignedTo._id,
      name: task.assignedTo.name,
      email: task.assignedTo.email
    } : null,
    dueDate: task.dueDate,
    createdAt: task.createdAt
  }));

  return res
    .status(200)
    .json(new ApiResponse(formattedTasks, 'Project tasks retrieved successfully', 200));
});

// POST /api/v1/projects/:id/tasks - Create a new task for a project
const createProjectTask = asyncHandler(async (req, res) => {
  const { id: projectId } = req.params;
  const { title, description, assignedTo, status = 'todo', dueDate } = req.body;
  const userId = req.user._id;
  const userRoles = req.user.roles;

  // Validate required fields
  if (!title || title.trim() === '') {
    throw new ApiError(400, 'Task title is required');
  }

  // Verify the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Only admins can create tasks
  if (!userRoles.includes('admin')) {
    throw new ApiError(403, 'Access denied - Only admins can create tasks');
  }

  // Validate status
  const validStatuses = ['todo', 'in_progress', 'in_review', 'done'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status. Must be one of: todo, in_progress, in_review, done');
  }

  // Validate dueDate if provided
  if (dueDate && new Date(dueDate) < new Date()) {
    throw new ApiError(400, 'Due date cannot be in the past');
  }

  // Create the task
  const taskData = {
    title: title.trim(),
    description: description?.trim() || '',
    project: projectId,
    status,
    dueDate: dueDate ? new Date(dueDate) : undefined
  };

  // Add assignedTo if provided and valid
  if (assignedTo) {
    // Validate that the assignedTo user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      throw new ApiError(400, 'Invalid assignedTo user - User not found');
    }
    taskData.assignedTo = assignedTo;
  }

  const task = await Task.create(taskData);
  
  // Populate the created task
  const populatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email');

  // Format response
  const formattedTask = {
    id: populatedTask._id,
    title: populatedTask.title,
    description: populatedTask.description,
    status: populatedTask.status,
    assignedTo: populatedTask.assignedTo ? {
      id: populatedTask.assignedTo._id,
      name: populatedTask.assignedTo.name,
      email: populatedTask.assignedTo.email
    } : null,
    dueDate: populatedTask.dueDate,
    createdAt: populatedTask.createdAt
  };

  return res
    .status(201)
    .json(new ApiResponse(formattedTask, 'Task created successfully', 201));
});

// GET /api/v1/projects/:id/messages - Get messages for a project with pagination
const getProjectMessages = asyncHandler(async (req, res) => {
  const { id: projectId } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const userId = req.user._id;
  const userRoles = req.user.roles;

  // Convert to numbers and validate
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    throw new ApiError(400, 'Invalid pagination parameters');
  }

  // Verify the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Role-based access control
  // Client can only see messages for their own projects
  // Admin can see messages for all projects
  if (userRoles.includes('client') && !userRoles.includes('admin')) {
    if (project.client.toString() !== userId.toString()) {
      throw new ApiError(403, 'Access denied - You can only view messages for your own projects');
    }
  }

  // Calculate pagination
  const skip = (pageNum - 1) * limitNum;

  // Get total count for pagination
  const totalMessages = await Message.countDocuments({ project: projectId });
  const totalPages = Math.ceil(totalMessages / limitNum);

  // Get messages for the project with pagination
  const messages = await Message.find({ project: projectId })
    .populate('sender', 'name email')
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limitNum);

  // Format the response
  const formattedMessages = messages.map(message => ({
    id: message._id,
    sender: {
      id: message.sender._id,
      name: message.sender.name,
      email: message.sender.email
    },
    content: message.content,
    timestamp: message.timestamp
  }));

  const responseData = {
    messages: formattedMessages,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalMessages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    }
  };

  return res
    .status(200)
    .json(new ApiResponse(responseData, 'Project messages retrieved successfully', 200));
});

// POST /api/v1/projects/:id/messages - Post a new message to a project
const createProjectMessage = asyncHandler(async (req, res) => {
  const { id: projectId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;
  const userRoles = req.user.roles;

  // Validate required fields
  if (!content || content.trim() === '') {
    throw new ApiError(400, 'Message content is required');
  }

  if (content.trim().length > 1000) {
    throw new ApiError(400, 'Message content cannot exceed 1000 characters');
  }

  // Verify the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Role-based access control
  // Client can only post messages to their own projects
  // Admin can post messages to all projects
  if (userRoles.includes('client') && !userRoles.includes('admin')) {
    if (project.client.toString() !== userId.toString()) {
      throw new ApiError(403, 'Access denied - You can only post messages to your own projects');
    }
  }

  // Create the message
  const message = await Message.create({
    project: projectId,
    sender: userId,
    content: content.trim()
  });

  // Populate the created message
  const populatedMessage = await Message.findById(message._id)
    .populate('sender', 'name email');

  // Format response
  const formattedMessage = {
    id: populatedMessage._id,
    sender: {
      id: populatedMessage.sender._id,
      name: populatedMessage.sender.name,
      email: populatedMessage.sender.email
    },
    content: populatedMessage.content,
    timestamp: populatedMessage.timestamp
  };

  return res
    .status(201)
    .json(new ApiResponse(formattedMessage, 'Message posted successfully', 201));
});

export { 
  getProjectTasks, 
  createProjectTask, 
  getProjectMessages, 
  createProjectMessage 
};
