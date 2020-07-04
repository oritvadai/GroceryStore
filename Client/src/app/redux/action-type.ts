export enum ActionType {

    // Home Info
    GetNumProducts,
    GetNumOrders,
    GetLastOrderByUser,
    GetOpenCartInfo,

    // Login
    Login,
    Logout,

    // Store
    GetCartContent,
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
