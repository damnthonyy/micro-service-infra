export class ProductEntity {
    constructor(
        public id: string | null,
        public name: string,
        public price: number,
        public description: string,
        public stock: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) { }
}