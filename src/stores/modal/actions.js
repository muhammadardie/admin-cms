import { modalConstants } from './constants';

export const modalActions = {
    add,
    edit,
    detail,
    deleteModal,
    toggle
};

function add() {
    return { type: modalConstants.ADD };
}

function edit(row) {
    return { type: modalConstants.EDIT, row: row};
}

function detail(row) {
    return { type: modalConstants.DETAIL, row: row};
}

function deleteModal(row) {
    return { type: modalConstants.DELETE, row: row};
}

function toggle() {
    return { type: modalConstants.TOGGLE};
}