use candid::{CandidType, Deserialize};
use ic_cdk::api::time;
use std::cell::RefCell;
use ic_cdk_macros::{query, update}; // ✅ fixed macro import

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Land {
    id: u64,
    name: String,
    location: String,
    size: String,
    timestamp: u64,
}

thread_local! {
    static LAND_REGISTRY: RefCell<Vec<Land>> = RefCell::new(Vec::new());
}

#[query]
fn get_all_lands() -> Vec<Land> {
    LAND_REGISTRY.with(|lands| lands.borrow().clone())
}

#[update]
fn register_land(name: String, location: String, size: String) -> String {
    LAND_REGISTRY.with(|lands| {
        let mut land_list = lands.borrow_mut();
        let id = land_list.len() as u64 + 1;

        let land = Land {
            id,
            name,
            location,
            size,
            timestamp: time(),
        };

        land_list.push(land);
        format!("Land #{} registered successfully.", id)
    })
}

#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
