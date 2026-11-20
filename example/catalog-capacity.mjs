const idPattern = /^[a-z0-9][a-z0-9-]{0,63}$/;

function validateId(id) {
    if (typeof id !== "string" || !idPattern.test(id)) {
        throw new TypeError("Expected a lowercase identifier of up to 64 characters.");
    }
}

export class CatalogCapacity {
    #stores = new Map();

    constructor(capacityByStore) {
        for (const [storeId, limit] of capacityByStore) {
            validateId(storeId);
            if (!Number.isSafeInteger(limit) || limit < 1 || this.#stores.has(storeId)) {
                throw new TypeError("Expected a unique store with a positive integer capacity.");
            }

            this.#stores.set(storeId, { limit, activeProducts: new Set() });
        }
    }

    setActive(storeId, productId, active) {
        validateId(storeId);
        validateId(productId);
        if (typeof active !== "boolean") {
            throw new TypeError("Expected a boolean active state.");
        }

        const store = this.#stores.get(storeId);
        if (!store) {
            throw new RangeError("Unknown demo store.");
        }

        const products = store.activeProducts;
        const alreadyActive = products.has(productId);
        if (active === alreadyActive) {
            return { outcome: "unchanged", activeCount: products.size };
        }

        if (active && products.size >= store.limit) {
            return { outcome: "at-capacity", activeCount: products.size };
        }

        if (active) {
            products.add(productId);
        } else {
            products.delete(productId);
        }

        return { outcome: "updated", activeCount: products.size };
    }
}
