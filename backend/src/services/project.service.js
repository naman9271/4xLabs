// import Project from '../models/project.model.js';
// import User from '../models/user.models.js';
// import Quote from '../models/quote.model.js';
// import { ApiError } from '../utils/ApiError.js';

// class ProjectService {
//   // Create a new project (business logic)
//   static async createProject(projectData, clientId) {
//     // Business rule: Auto-assign status
//     const newProjectData = {
//       ...projectData,
//       client: clientId,
//       status: 'pending_quote', // Default status for new projects
//     };

//     // Validate deadline business rule
//     if (projectData.deadline && new Date(projectData.deadline) < new Date()) {
//       throw new ApiError(400, 'Deadline cannot be in the past');
//     }

//     const project = await Project.create(newProjectData);
    
//     // Business logic: Populate client data for response
//     return await Project.findById(project._id)
//       .populate('client', 'name email')
//       .lean();
//   }

//   // Get projects based on user role (business logic)
//   static async getProjectsForUser(user, filters = {}) {
//     let query = {};

//     // Business rule: Role-based project access
//     if (user.roles.includes('admin')) {
//       // Admin (your team) sees all projects
//       query = {};
//     } else if (user.roles.includes('client')) {
//       // Clients see only their own projects
//       query = { client: user._id };
//     } else {
//       throw new ApiError(403, 'Access denied');
//     }

//     // Apply additional filters
//     if (filters.status) {
//       query.status = filters.status;
//     }

//     return query;
//   }

//   // Assign project to team member (admin functionality)
//   static async assignProjectToTeamMember(projectId, teamMemberIds, adminId) {
//     const project = await Project.findById(projectId);
    
//     if (!project) {
//       throw new ApiError(404, 'Project not found');
//     }

//     // Business rule: Only admins can assign projects
//     const admin = await User.findById(adminId);
//     if (!admin.roles.includes('admin')) {
//       throw new ApiError(403, 'Only admin can assign projects');
//     }

//     // Business rule: Validate team members exist and are admins
//     const teamMembers = await User.find({
//       _id: { $in: teamMemberIds },
//       roles: { $in: ['admin'] }
//     });

//     if (teamMembers.length !== teamMemberIds.length) {
//       throw new ApiError(400, 'Some team members not found or not admins');
//     }

//     // Business rule: Auto-update status when assigning
//     const updateData = {
//       freelancers: teamMemberIds,
//       status: project.status === 'pending_quote' ? 'awaiting_approval' : project.status
//     };

//     return await Project.findByIdAndUpdate(
//       projectId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     ).populate('client', 'name email')
//      .populate('freelancers', 'name email');
//   }

//   // Create quote for project (admin business logic)
//   static async createQuoteForProject(projectId, quoteData, adminId) {
//     const project = await Project.findById(projectId);
    
//     if (!project) {
//       throw new ApiError(404, 'Project not found');
//     }

//     // Business rule: Can only quote pending projects
//     if (project.status !== 'pending_quote') {
//       throw new ApiError(400, 'Can only create quotes for pending projects');
//     }

//     // Business rule: Set default valid until date (30 days)
//     const validUntil = quoteData.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

//     const quote = await Quote.create({
//       project: projectId,
//       amount: quoteData.amount,
//       description: quoteData.description,
//       estimatedDuration: quoteData.estimatedDuration,
//       validUntil,
//       terms: quoteData.terms || '',
//       createdBy: adminId,
//       status: 'draft'
//     });

//     return await Quote.findById(quote._id)
//       .populate('project', 'title client')
//       .populate('createdBy', 'name email');
//   }

//   // Update project status with business rules
//   static async updateProjectStatus(projectId, newStatus, userId) {
//     const project = await Project.findById(projectId);
    
//     if (!project) {
//       throw new ApiError(404, 'Project not found');
//     }

//     // Business rule: Status transition validation
//     const validTransitions = {
//       'pending_quote': ['awaiting_approval', 'cancelled'],
//       'awaiting_approval': ['in_progress', 'cancelled'],
//       'in_progress': ['in_review'],
//       'in_review': ['completed', 'in_progress'],
//       'completed': [], // Cannot change from completed
//       'cancelled': [] // Cannot change from cancelled
//     };

//     if (!validTransitions[project.status].includes(newStatus)) {
//       throw new ApiError(400, `Cannot change status from ${project.status} to ${newStatus}`);
//     }

//     // Business rule: Only admins can change most statuses
//     const user = await User.findById(userId);
//     if (!user.roles.includes('admin') && newStatus !== 'cancelled') {
//       throw new ApiError(403, 'Only admin can update project status');
//     }

//     return await Project.findByIdAndUpdate(
//       projectId,
//       { $set: { status: newStatus } },
//       { new: true, runValidators: true }
//     ).populate('client', 'name email')
//      .populate('freelancers', 'name email');
//   }
// }

// export default ProjectService;
