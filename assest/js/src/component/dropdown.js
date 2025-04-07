const Dropdown = function ({
    dropdownClass = 'js-dropdown',
    dropdownToggleClass = 'js-dropdown-toggle',
    dropdownMenuClass = 'js-dropdown-menu',
    dropdownItemClass = 'js-dropdown-item',
}) {
    const dropdownElem = document.querySelector(`.${dropdownClass}`);
    if (!dropdownElem) return;

    let openClass = 'open';

    const dropdownToggleElems = dropdownElem.querySelectorAll(
        `.${dropdownToggleClass}`
    );
    if (!dropdownToggleElems.length) return;

    function init() {
        dropdownElem.addEventListener('click', _handleClickDropdownToggle);
        document.addEventListener('click', _handleClickOutside);

        return this;
    }

    function _handleClickDropdownToggle(event) {
        const clickedBtn = event.target.closest(`.${dropdownToggleClass}`);
        if (!clickedBtn) return;
        let dropdownMenuElem = dropdownElem.querySelector(
            `.${dropdownMenuClass}`
        );

        if (!dropdownMenuElem) {
            dropdownMenuElem = clickedBtn.nextElementSibling;
            if (!dropdownMenuElem) return;
        }

        const isOpen = dropdownMenuElem.classList.contains(openClass);
        if (isOpen) {
            dropdownMenuElem.classList.remove(openClass);
            console.log(`Add ${openClass} class to dropdown menu`);
        } else {
            dropdownMenuElem.classList.add(openClass);
        }
    }

    function _handleClickOutside(event) {
        const clickedElem = event.target.closest(`.${dropdownClass}`);
        if (clickedElem) return;

        dropdownToggleElems.forEach((toggleElem) => {
            const dropdownMenuElem = toggleElem.nextElementSibling;
            if (!dropdownMenuElem) return;
            if (dropdownMenuElem.classList.contains(openClass)) {
                dropdownMenuElem.classList.remove(openClass);
            }
        });
    }

    return {
        init,
    };
};

export default Dropdown;
