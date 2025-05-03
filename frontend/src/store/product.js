import {create} from "zustand"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),
  createProduct: async(newProduct) => {
    if(!newProduct.name || !newProduct.image || !newProduct.price) {
      return {success:false, message:"Please fill in all fields."}
    }
    const res = await fetch("/api/products", { //sends POST request to backend
      method:"POST", //specifies HTTP method
      headers:{
        "Content-Type":"application/json" //tells backend I'm sending JSON data
      },
      body:JSON.stringify(newProduct) //converts newProduct state to JSON
    })
    const data = await res.json(); //converts response from server into JSON
    set ((state) => ({products: [...state.products, data.data] })); //{...} -> the spread operator
    return {success: true, message: "Product created successfully"}
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return { success:false , message: data.message }
    
    //updates the UI immediately, without needing a refresh
    set(state => ({ products: state.products.filter(product => product._id !== pid) }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? data.data : product)),
    }));

    return { success: true, message: data.message };
  },
}));

