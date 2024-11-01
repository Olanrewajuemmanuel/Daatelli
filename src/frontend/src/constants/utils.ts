import { v4 as uuid } from "uuid";
import { FindingsBadge } from "../types/enums";
import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";

export const idGenerator = () => uuid();

export const HEALTH_CHECK_INTERVAL = 15000;

export const SYSTEM_MESSAGES = {
    'health-check-failure': 'Server is busy. Please wait as we try to reconnect.',
    'login-success': 'Login successful',
    'login-failure-credentials': 'Invalid credentials',
    'register-success': 'Registration successful',
    'register-failure': 'Your registration was unsuccessful due to the following reasons:',
    'logout-success': 'Logout successful',
    'logout-failure': 'Logout failed',
    'reset-password-success': 'Password reset successful',
    'reset-password-failure': 'Password reset failed',
    'forgot-password-success': 'Instructions to reset your password has been sent to the provided email',
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

export const researchKeywords = [
    'positive correlation', 'negative correlation', /\d+(?:\.\d+)?%/g, 'association', 'pattern',
    'implications', 'aligns with', 'population', 'cohort', 'study', 'probability', 'p-value', 'significance',
    'mean', 'median', 'mode', 'range', 'standard deviation', 'variance',
    'correlation', 'coefficient', 'co-relation', 'co-variance', 'covariance', 'co-occurrence', 'trend'
]

export const truncateText = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const badgeColor = (badge: FindingsBadge) => {
    switch (badge) {
        case FindingsBadge.correlations:
            return "bg-info";
        case FindingsBadge.outlier:
            return "bg-primary";
        case FindingsBadge.significant:
            return "bg-success";
        case FindingsBadge.unexpected:
            return "bg-gray-600";
        default:
            break;
    }
}

export const formatDate = (date: string) => {
    /**
     * Format date based on the following conditions:
     * >> If date is posted now, return "Just now"
     * >> If date is posted within the last 24 hours, return "x hours ago"
     * >> If date is posted within the last 7 days, return "x days ago"
     * >> If date is posted more than 7 days ago, return "mm dd, yyyy" if year is different, otherwise "mm dd"
     * 
     * @param date - Date to format, may include time info
     * @returns Formatted date string
     */
    const currentDate = new Date();
    const parsedDate = parseISO(date);
    const diffInDays = Math.floor((currentDate.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (isToday(parsedDate)) {
        const diffInMinutes = Math.floor((currentDate.getTime() - parsedDate.getTime()) / (1000 * 60));
        if (diffInMinutes < 5) {
            // If the post is less than 5 minutes old, return "Just now"
            return "Just now";
        } else {
            return formatDistanceToNow(parsedDate, { addSuffix: true });
        }
    } else if (isYesterday(parsedDate)) {
        return "Yesterday";
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInDays < 365) {
        return format(parsedDate, 'MMM dd');
    } else {
        return format(parsedDate, 'MMM dd, yyyy');
    }
}
