import Project from '../models/project.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

// POST /api/v1/projects - Create a new project (Client only)
const createProject = asyncHandler(async (req, res) => {
  const { title, description, deadline, files } = req.body;

  // Validate required fields
  if (!title || !description) {
    throw new ApiError(400, 'Title and description are required');
  }

  // Validate title and description are not empty
  if (title.trim() === '' || description.trim() === '') {
    throw new ApiError(400, 'Title and description cannot be empty');
  }

  // Validate deadline if provided
  if (deadline && new Date(deadline) < new Date()) {
    throw new ApiError(400, 'Deadline cannot be in the past');
  }

  // Validate files array if provided
  if (files && !Array.isArray(files)) {
    throw new ApiError(400, 'Files must be an array');
  }

  // Create project data
  const projectData = {
    title: title.trim(),
    description: description.trim(),
    client: req.user._id,
    status: 'pending_quote', // Default status for new projects
  };

  // Add optional fields if provided
  if (deadline) {
    projectData.deadline = new Date(deadline);
  }

  if (files && files.length > 0) {
    // Validate file objects
    const validFiles = files.filter(file => file.name && file.url);
    projectData.files = validFiles;
  }

  // Create the project
  const project = await Project.create(projectData);

  // Populate client details for response
  const createdProject = await Project.findById(project._id)
    .populate('client', 'name email')
    .lean();

  return res
    .status(201)
    .json(new ApiResponse(createdProject, 'Project created successfully', 201));
});

// GET /api/v1/projects - Get projects based on user role
const getProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const user = req.user;

  // Build query based on user role
  let query = {};

  if (user.roles.includes('admin')) {
    // Admin sees all projects
    query = {};
  } else if (user.roles.includes('client')) {
    // Clients see only their own projects
    query = { client: user._id };
  } else {
    throw new ApiError(403, 'Access denied');
  }

  // Add status filter if provided
  if (status) {
    const validStatuses = ['pending_quote', 'awaiting_approval', 'in_progress', 'in_review', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status filter');
    }
    query.status = status;
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Get projects with pagination
  const projects = await Project.find(query)
    .populate('client', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  // Get total count for pagination
  const totalProjects = await Project.countDocuments(query);

  // Format response
  const response = {
    projects,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProjects / parseInt(limit)),
      totalProjects,
      hasNext: skip + projects.length < totalProjects,
      hasPrev: parseInt(page) > 1,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(response, 'Projects retrieved successfully', 200));
});

// GET /api/v1/projects/:id - Get single project by ID
const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid project ID format');
  }

  // Find project
  const project = await Project.findById(id)
    .populate('client', 'name email')
    .lean();

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Check access permissions based on role
  if (user.roles.includes('admin')) {
    // Admin can see all projects
  } else if (user.roles.includes('client')) {
    // Clients can only see their own projects
    if (project.client._id.toString() !== user._id.toString()) {
      throw new ApiError(403, 'Access denied - You can only view your own projects');
    }
  } else {
    throw new ApiError(403, 'Access denied');
  }

  return res
    .status(200)
    .json(new ApiResponse(project, 'Project retrieved successfully', 200));
});

// PUT /api/v1/projects/:id - Update project (Admin only)
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, budget, deadline, freelancers, files } = req.body;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid project ID format');
  }

  // Find project
  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Build update object
  const updateData = {};

  // Validate and set status if provided
  if (status !== undefined) {
    const validStatuses = ['pending_quote', 'awaiting_approval', 'in_progress', 'in_review', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status value');
    }
    updateData.status = status;
  }

  // Validate and set budget if provided
  if (budget !== undefined) {
    if (typeof budget !== 'number' || budget < 0) {
      throw new ApiError(400, 'Budget must be a positive number');
    }
    updateData.budget = budget;
  }

  // Validate and set deadline if provided
  if (deadline !== undefined) {
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      throw new ApiError(400, 'Invalid deadline format');
    }
    updateData.deadline = deadlineDate;
  }

  // Validate and set freelancers if provided
  if (freelancers !== undefined) {
    if (!Array.isArray(freelancers)) {
      throw new ApiError(400, 'Freelancers must be an array');
    }
    
    // Validate each freelancer ID
    for (const freelancerId of freelancers) {
      if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
        throw new ApiError(400, `Invalid freelancer ID: ${freelancerId}`);
      }
    }
    updateData.freelancers = freelancers;
  }

  // Validate and set files if provided
  if (files !== undefined) {
    if (!Array.isArray(files)) {
      throw new ApiError(400, 'Files must be an array');
    }
    
    // Validate file objects
    const validFiles = files.filter(file => file.name && file.url);
    updateData.files = validFiles;
  }

  // Check if there's anything to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, 'No valid update data provided');
  }

  // Update project
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('client', 'name email').lean();

  return res
    .status(200)
    .json(new ApiResponse(updatedProject, 'Project updated successfully', 200));
});

export { createProject, getProjects, getProjectById, updateProject };
