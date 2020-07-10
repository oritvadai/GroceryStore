export enum ActionType {

    // Home Info
    GetNumProducts,
    GetNumOrders,
    GetLastOrderByUser,
    GetOpenCartInfo,

    // Login
    Login,
    Logout,

    // Cart
    GetCartContent,
    GetItems,
    AddItem,
    RemoveItem,
    ClearCart,
    GetTotalPrice,

    // Store
    GetAllCategories,
    GetProductsView,

    // admin
    AdminUpdateProductId,
    AdminUpdateProduct

    // AdminGetAllProducts,
    // AdminAddProduct,
}
