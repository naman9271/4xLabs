import express from 'express';
import { 
  getProjectTasks, 
  createProjectTask, 
  getProjectMessages, 
  createProjectMessage 
} from '../controllers/project_subResources.controller.js';
import { verifyJWT, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route

// All project sub-resource routes require authentication
router.use(verifyJWT);

// /api/v1/projects/:id/tasks routes - Task management for specific project
router.route('/tasks')
  .get(authorize('client', 'admin'), getProjectTasks)      // Get all tasks (Client, Admin)
  .post(authorize('admin'), createProjectTask);           // Create new task (Admin only)

// /api/v1/projects/:id/messages routes - Message management for specific project
router.route('/messages')
  .get(authorize('client', 'admin'), getProjectMessages)   // Get messages (Client, Admin)
  .post(authorize('client', 'admin'), createProjectMessage); // Post message (Client, Admin)

export default router;
