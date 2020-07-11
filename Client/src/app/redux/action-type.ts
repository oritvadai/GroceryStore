export enum ActionType {

    // Home Info
    GetNumProducts,
    GetNumOrders,
    GetLastOrderByUser,
    GetOpenCartInfo,

    // Login
    Login,
    Logout,

    // Store & Admin
    GetAllCategories,
    GetProductsView,

    // Cart
    GetCartContent,
    GetItems,
    AddItem,
    RemoveItem,
    ClearCart,
    GetTotalPrice,

    // admin
    AdminUpdateProductId,
    AdminUpdateProduct,
    AdminAddProduct
}
