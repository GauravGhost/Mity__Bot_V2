
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        const response = await this.model.find();
    }
}