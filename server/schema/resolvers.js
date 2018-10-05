const axios = require('axios');
let foodItems = [{id: 1, name: 'steak', category: 'meat'}];
let id = 1;

const resolvers = {
  Query: {
    async people(){      // <-- parent(_), arguments(args), context(ctx)     are the 3 params.
      const response = await axios.get("https://www.swapi.co/api/people");
      return response.data.results;
    },
    food(){
      return foodItems;
    },
    foodItem(_, {id}){
      const item = foodItems.find(val => val.id === +id);
      if(!item){
        throw new Error(`No ID matching ${id}`);
      } else {
        return item;
      }
    }
  },
  Mutation: {
    addItem(_, {name, category}){
      foodItems.push({
        id: id +=1,
        name,
        category
      });
      return foodItems;
    },
    deleteItem(_, {id}){
      const item = foodItems.find(val => val.id === +id);
      if(!item){
        throw new Error(`Id: ${id} not found!`)
      } else {
        foodItems = foodItems.filter(val => val.id !== +id);
        return id;
      }
    }
  }
};

module.exports = resolvers;