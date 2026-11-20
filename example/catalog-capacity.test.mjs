import assert from "node:assert/strict";
import test from "node:test";

import { CatalogCapacity } from "./catalog-capacity.mjs";

function createCatalog() {
    return new CatalogCapacity([["north-shop", 2], ["south-shop", 1]]);
}

test("activation occupies one slot", () => {
    const catalog = createCatalog();
    assert.deepEqual(catalog.setActive("north-shop", "sample-one", true), {
        outcome: "updated",
        activeCount: 1,
    });
});

test("a repeated update preserves the count", () => {
    const catalog = createCatalog();
    catalog.setActive("north-shop", "sample-one", true);
    assert.deepEqual(catalog.setActive("north-shop", "sample-one", true), {
        outcome: "unchanged",
        activeCount: 1,
    });
});

test("a full store rejects another active product without changing its count", () => {
    const catalog = createCatalog();
    catalog.setActive("north-shop", "sample-one", true);
    catalog.setActive("north-shop", "sample-two", true);
    assert.deepEqual(catalog.setActive("north-shop", "sample-three", true), {
        outcome: "at-capacity",
        activeCount: 2,
    });
});

test("deactivation frees a slot and can be repeated safely", () => {
    const catalog = createCatalog();
    catalog.setActive("south-shop", "sample-one", true);
    assert.equal(catalog.setActive("south-shop", "sample-one", false).activeCount, 0);
    assert.equal(catalog.setActive("south-shop", "sample-one", false).outcome, "unchanged");
    assert.equal(catalog.setActive("south-shop", "sample-two", true).outcome, "updated");
});

test("stores count an identical product identifier independently", () => {
    const catalog = createCatalog();
    catalog.setActive("north-shop", "sample-one", true);
    assert.deepEqual(catalog.setActive("south-shop", "sample-one", true), {
        outcome: "updated",
        activeCount: 1,
    });
});

test("invalid inputs are rejected before changing data", () => {
    const catalog = createCatalog();
    assert.throws(() => catalog.setActive("missing-shop", "sample-one", true), RangeError);
    assert.throws(() => catalog.setActive("north-shop", "other/path", true), TypeError);
    assert.throws(() => catalog.setActive("north-shop", "sample-one", "true"), TypeError);
    assert.throws(() => new CatalogCapacity([["shop", 0]]), TypeError);
    assert.throws(() => new CatalogCapacity([["shop", 1], ["shop", 2]]), TypeError);
    assert.equal(catalog.setActive("north-shop", "sample-one", true).activeCount, 1);
});
