export const checkUserIsAdmin = currentUser => {
    //determines that user does not have admin access
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } = currentUser;
    if (userRoles.includes('admin')) return true;

    return false;
}