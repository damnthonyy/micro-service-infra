export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public description: string,
        public stock: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) { }
}