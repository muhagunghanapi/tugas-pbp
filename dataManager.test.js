const { addData, deleteData, editData, dataStore } = require('./dataManager');

describe('Data Manager', () => {
    afterEach(() => {
        for (const key in dataStore) {
            delete dataStore[key];
        }
    });

    test('should add valid', () => {
        addData({ id: 1, name: 'Agung'});
        expect(dataStore).toHaveProperty('1');
        expect(dataStore['1']).toEqual({ id: 1, name: 'Agung'});
    });

    test('should throw error when adding data with dulicate ID', () =>{
        addData({ id: 1, name: 'Agung'});
        expect(() => {
            addData({ name: 'Agung'});
        }).toThrow("Invalid data");
    });

    test('should delete existing data', () => {
        addData({ id: 1, name: 'Agung'});
        deleteData(1);
        expect(dataStore).not.toHaveProperty('1');
    });

    test('should throw error when deleting non-existing data', () => {
        expect(() => {
            deleteData(99);
        }).toThrow("Data not found");
    });

    test('should edit existing data', () => {
        addData({ id: 1, name: 'Agung'});
        editData(1, {name: 'Agung'});
        expect(dataStore['1']).toEqual({ id: 1, name: 'Agung'});
    });

    test('should throw error when editing non-existing data', () => {
        expect(() => {
            editData(99, {name: 'Agung'});
        }).toThrow("Data not found");
    });

    test('should throw error when editing data with invalid format', () => {
        addData({ id: 1, name: 'Agung'});
        expect(() => {
            editData(1, {});
        }).not.toThrow();
        expect(dataStore['1']).toEqual({ id: 1, name: 'Agung'});
    });
});