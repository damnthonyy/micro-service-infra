// Entity class for the User entity
export class UserEntity {
    constructor(
        public id: number | null,
        public name: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}