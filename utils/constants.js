export const constants = {
    httpStatusCode: {
        success: 200,
        unauthorised: 401,
        forbidden: 403,
        badRequest: 400,
        failedOperation: 500,
        cantProcess: 422,
        noContent: 204,
        conflict: 409,
        notFound: 404,
        tooManyRequest: 429
    },
    responseCodes: {
        successfulOperation: 200,
        unauthorizedAccess: 401,
        failedOperation: 500,
        revalidation: 400,
        noContent: 204,
        forbidden: 403,
        notFound: 404,
        cantProcess: 422,
        conflict: 409,
        tooManyRequest: 429
    },
    moduleNames: {
        models: 'models',
        categories: 'categories',
        masterCategories: 'master-categories',
        users: 'users',
        brands: 'brands',
        products: 'products',
        unit: 'unit',
        attributes: 'attributes',
        packages: 'packages',
        masters: 'masters'
    },
    messageKeys: {
        en: {
            msg_success: "Success",
            msg_failed: "Failed",
            msg_revalidate: "Revalidation error",
            msg_no_data: "No data found",
            msg_invalid_data: "Invalid data",
            msg_invalid_request: "Invalid request"
        }
    }
}
