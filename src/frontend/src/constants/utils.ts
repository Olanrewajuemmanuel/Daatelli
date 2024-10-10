import { v4 as uuid } from "uuid";

export const idGenerator = uuid();

export const HEALTH_CHECK_INTERVAL = 15000;

export const SYSTEM_MESSAGES = {
    'health-check-failure': 'Server is busy. Please wait as we try to reconnect.',
    'login-success': 'Login successful',
    'login-failure-credentials': 'Invalid credentials',
    'register-success': 'Registration successful',
    'logout-success': 'Logout successful',
    'logout-failure': 'Logout failed',
    'reset-password-success': 'Password reset successful',
    'reset-password-failure': 'Password reset failed',
    'forgot-password-success': 'Password reset email sent',
    'forgot-password-failure': 'Password reset email failed',
    'add-findings-success': 'New finding added successfully',
    'add-findings-failure': 'Failed to add new finding',
    'view-finding-success': 'View finding successful',
    'view-finding-failure': 'Finding could not be found',
    'edit-finding-success': 'Finding edited successfully',
    'edit-finding-failure': 'Failed to edit finding',
    'delete-finding-success': 'Finding deleted successfully',
    'delete-finding-failure': 'Failed to delete finding',
}
