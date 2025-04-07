document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items');
    const orderList = document.getElementById('order-list');
    const form = document.getElementById('order-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    let order = [];

    fetch('meny.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('menu-item');
                itemDiv.innerHTML = `
                    <p><strong>${item.navn}</strong> – kr ${item.pris}</p>
                    <button class="add-btn">Legg til</button>
                `;
                const button = itemDiv.querySelector('button');
                button.addEventListener('click', () => addToOrder(item));
                menuContainer.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Feil ved lasting av meny:', error));

   
    function addToOrder(item) {
        order.push(item);
        renderOrder();
    }

   
    function renderOrder() {
        orderList.innerHTML = '<h3>Din bestilling:</h3>';
        const list = document.createElement('ul');
        order.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.navn} – kr ${item.pris}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Fjern';
            removeBtn.style.marginLeft = '10px';
            removeBtn.addEventListener('click', () => {
                order.splice(index, 1);
                renderOrder();
            });
            li.appendChild(removeBtn);
            list.appendChild(li);
        });
        orderList.appendChild(list);
    }

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
            alert('Vennligst fyll ut navn og telefonnummer.');
            return;
        }

        if (order.length === 0) {
            alert('Du må legge til minst én vare i bestillingen.');
            return;
        }

        alert(`Takk for din bestilling, ${nameInput.value}!`);
        order = [];
        renderOrder();
        form.reset();
    });
});
