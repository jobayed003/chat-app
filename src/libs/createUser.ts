export const createUser = async () => {
   await fetch('/api/users', { method: 'POST', body: JSON.stringify({}) });
};
