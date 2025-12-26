export const authService = {
    login(username, password) {
        if (username === 'admin' && password === 'admin333') {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'admin' }));
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    },

    isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};
