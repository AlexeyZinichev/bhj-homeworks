document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    
    const tooltipEl = document.createElement('div');
    tooltipEl.classList.add('tooltip');
    document.body.appendChild(tooltipEl);

    let currentActiveLink = null;

    // Функция проверки границ (остается прежней)
    const getValidatedPosition = (link, requestedPos) => {
        const rect = link.getBoundingClientRect();
        
        tooltipEl.textContent = link.getAttribute('title');
        tooltipEl.classList.add('tooltip_active'); 
        
        const tipHeight = tooltipEl.offsetHeight;
        const tipWidth = tooltipEl.offsetWidth;
        
        tooltipEl.classList.remove('tooltip_active');

        switch (requestedPos) {
            case 'bottom':
                if (rect.bottom + 5 + tipHeight > window.innerHeight && rect.top - 5 - tipHeight > 0) {
                    return 'top';
                }
                break;
            case 'top':
                if (rect.top - 5 - tipHeight < 0 && rect.bottom + 5 + tipHeight < window.innerHeight) {
                    return 'bottom';
                }
                break;
            case 'right':
                if (rect.right + 5 + tipWidth > window.innerWidth && rect.left - 5 - tipWidth > 0) {
                    return 'left';
                }
                break;
            case 'left':
                if (rect.left - 5 - tipWidth < 0 && rect.right + 5 + tipWidth < window.innerWidth) {
                    return 'right';
                }
                break;
        }
        return requestedPos;
    };

    const showTooltip = (link) => {
        if (currentActiveLink === link) return;

        hideTooltip();

        const titleText = link.getAttribute('title');
        if (!titleText) return;

        const requestedPosition = link.dataset.position || 'bottom';
        const finalPosition = getValidatedPosition(link, requestedPosition);
        
        link.removeAttribute('title');
        tooltipEl.textContent = titleText;

        // Получаем границы элемента БЕЗ учета скролла
        const rect = link.getBoundingClientRect();

        // Сброс стилей
        tooltipEl.style.top = '';
        tooltipEl.style.bottom = '';
        tooltipEl.style.left = '';
        tooltipEl.style.right = '';

        // *** ГЛАВНОЕ ИЗМЕНЕНИЕ ЗДЕСЬ ***
        // Убраны window.scrollX и window.scrollY
        switch (finalPosition) {
            case 'bottom':
                tooltipEl.style.left = `${rect.left}px`;
                tooltipEl.style.top = `${rect.bottom + 5}px`;
                break;
                
            case 'top':
                tooltipEl.style.left = `${rect.left}px`;
                tooltipEl.style.bottom = `${window.innerHeight - rect.top + 5}px`;
                break;

            case 'left':
                tooltipEl.style.right = `${window.innerWidth - rect.left + 5}px`;
                tooltipEl.style.top = `${rect.top + rect.height / 2}px`;
                break;

            case 'right':
                tooltipEl.style.left = `${rect.right + 5}px`;
                tooltipEl.style.top = `${rect.top + rect.height / 2}px`;
                break;
        }

        tooltipEl.classList.add('tooltip_active');
        currentActiveLink = link;
    };

    const hideTooltip = () => {
        if (currentActiveLink) {
            currentActiveLink.setAttribute('title', tooltipEl.textContent);
            currentActiveLink = null;
        }
        tooltipEl.classList.remove('tooltip_active');
        tooltipEl.style.top = '';
        tooltipEl.style.bottom = '';
        tooltipEl.style.left = '';
        tooltipEl.style.right = '';
    };

    tooltipElements.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showTooltip(link);
        });
    });

    document.addEventListener('click', (e) => {
        if (!tooltipEl.contains(e.target)) {
            let isTriggerClicked = false;
            tooltipElements.forEach(trigger => {
                if (trigger.contains(e.target)) {
                    isTriggerClicked = true;
                }
            });
            if (!isTriggerClicked) {
                hideTooltip();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideTooltip();
        }
    });
});