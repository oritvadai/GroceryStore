export enum ActionType {

    // Home Info
    GetNumProducts,
    GetNumOrders,
    GetLastOrderByUser,

    // Login
    Login,
    Logout,

    // Store
    GetCart,
    GetItems,
    AddItem,
    RemoveItem,
    ClearCart,
    GetAllCategories,
    GetProductsView,

    // admin
    AdminGetAllProducts,
    AdminAddProduct,
    AdminUpdateProduct
}
