/**
 * @typedef {Object} User
 */
export class User {
    /**
     * @param {{ id: number, username: string, role: string }} param
     */
    constructor({ id, username, role }) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
}