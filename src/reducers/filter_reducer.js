import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let max_price = action.payload.map((product) => product.price);
      max_price = Math.max(...max_price);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price, price: max_price },
      };
    case SET_GRIDVIEW: {
      return { ...state, grid_view: true };
    }
    case SET_LISTVIEW: {
      return { ...state, grid_view: false };
    }
    case UPDATE_SORT: {
      return { ...state, sort: action.payload };
    }
    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      let tempProduct = [...filtered_products];
      if (sort === "price-lowest") {
        tempProduct = tempProduct.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProduct = tempProduct.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProduct = tempProduct.sort((a, b) => {
          return a.name.localeCompare(b.name.localeCompare);
        });
      }
      if (sort === "name-z") {
        tempProduct = tempProduct.sort((a, b) => {
          return b.name.localeCompare(a.name.localeCompare);
        });
      }
      return { ...state, filtered_products: tempProduct };
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    }
    case FILTER_PRODUCTS: {
      // console.log("filtering products...");
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempProducts = [...all_products];
      //filtering
      //text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      //category
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      //company
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      //color:- color is array so array find method;
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      //price
      if (price) {
        tempProducts = tempProducts.filter((product) => product.price <= price);
      }
      //shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filtered_products: tempProducts };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }

  // return state
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
