import express from 'express';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject 
} from '../controllers/project.controller.js';
import { verifyJWT, authorize } from '../middlewares/auth.middleware.js';
import projectSubResourcesRoutes from './project_subResources.route.js';

const router = express.Router();

// All project routes require authentication
router.use(verifyJWT);

// /api/v1/projects routes - Project management
router.route('/')
  .post(authorize('client'), createProject)           // Create new project (Client only)
  .get(authorize('client', 'admin'), getProjects);    // Get projects based on role

// /api/v1/projects/:id routes - Specific project operations
router.route('/:id')
  .get(authorize('client', 'admin'), getProjectById)  // Get single project
  .put(authorize('admin'), updateProject);            // Update project (Admin only)

// Sub-resource routes for projects (tasks, messages, etc.)
router.use('/:id', projectSubResourcesRoutes);

export default router;
