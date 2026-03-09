// 道具数据库
const itemDatabase = {
    // 增益道具
    "健康药水": {
        id: "health-potion",
        name: "健康药水",
        type: "增益道具",
        description: "恢复20点生命值",
        icon: "fas fa-flask",
        effect: { health: 20 },
        probability: 0.3,
        price: 30
    },
    "智力药水": {
        id: "intelligence-potion",
        name: "智力药水",
        type: "增益道具",
        description: "增加15点智力",
        icon: "fas fa-brain",
        effect: { intelligence: 15 },
        probability: 0.25,
        price: 40
    },
    "社交药水": {
        id: "social-potion",
        name: "社交药水",
        type: "增益道具",
        description: "增加15点社交",
        icon: "fas fa-users",
        effect: { social: 15 },
        probability: 0.25,
        price: 40
    },
    "金币袋": {
        id: "gold-bag",
        name: "金币袋",
        type: "增益道具",
        description: "增加50点资金",
        icon: "fas fa-coins",
        effect: { money: 50 },
        probability: 0.2,
        price: 0
    },
    
    // 负面道具
    "毒蘑菇": {
        id: "poison-mushroom",
        name: "毒蘑菇",
        type: "负面道具",
        description: "减少15点生命值",
        icon: "fas fa-mushroom",
        effect: { health: -15 },
        probability: 0.15,
        price: 0
    },
    "诅咒书": {
        id: "cursed-book",
        name: "诅咒书",
        type: "负面道具",
        description: "减少10点智力和10点社交",
        icon: "fas fa-book-dead",
        effect: { intelligence: -10, social: -10 },
        probability: 0.1,
        price: 0
    },
    
    // 特殊道具
    "凉亭线索碎片": {
        id: "pavilion-fragment",
        name: "凉亭线索碎片",
        type: "关键道具",
        description: "收集10个可以解锁银色凉亭的秘密",
        icon: "fas fa-scroll",
        effect: { exploration: 5 },
        probability: 0.1,
        price: 0
    },
    "校园地图": {
        id: "campus-map",
        name: "校园地图",
        type: "日常道具",
        description: "增加探索效率，减少迷路概率",
        icon: "fas fa-map",
        effect: { exploration: 10 },
        probability: 0.15,
        price: 25
    },
    "学习笔记": {
        id: "study-notes",
        name: "学习笔记",
        type: "日常道具",
        description: "增加10点智力和5点学分",
        icon: "fas fa-sticky-note",
        effect: { intelligence: 10, credit: 5 },
        probability: 0.2,
        price: 35
    }
};

// 随机掉落道具
function randomDropItem() {
    // 计算总概率
    let totalProbability = 0;
    Object.values(itemDatabase).forEach(item => {
        totalProbability += item.probability;
    });
    
    // 生成随机数
    let random = Math.random() * totalProbability;
    
    // 选择道具
    for (const item of Object.values(itemDatabase)) {
        random -= item.probability;
        if (random <= 0) {
            return item;
        }
    }
    
    return null;
}

// 更新背包
function updateInventory() {
    const inventoryContainer = document.getElementById('inventory-items');
    inventoryContainer.innerHTML = '';
    
    if (gameState.inventory.length === 0) {
        inventoryContainer.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #999; font-style: italic;">背包为空</div>';
        return;
    }
    
    gameState.inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        
        // 添加特殊样式
        if (item.type === "关键道具") {
            itemElement.classList.add('key-item');
        } else if (item.type === "负面道具") {
            itemElement.classList.add('negative-item');
        } else if (item.type === "日常道具") {
            itemElement.classList.add('neutral-item');
        }
        
        itemElement.innerHTML = `
            <div class="item-icon" style="background: ${item.type === '负面道具' ? '#ffebee' : item.type === '关键道具' ? '#fffde7' : '#f5f9ff'};">
                <i class="${item.icon}" style="color: ${item.type === '负面道具' ? '#f44336' : item.type === '关键道具' ? '#ffd600' : '#1e88e5'};"></i>
            </div>
            <div class="item-name">${item.name}</div>
            ${item.count > 1 ? `<div class="item-count">${item.count}</div>` : ''}
        `;
        
        // 添加点击事件
        itemElement.addEventListener('click', function() {
            showItemDetails(item);
        });
        
        inventoryContainer.appendChild(itemElement);
    });
}

// 显示道具详情
function showItemDetails(item) {
    gameState.selectedItem = item;
    
    document.getElementById('item-name').textContent = item.name;
    document.getElementById('item-description').textContent = item.description;
    document.getElementById('item-effect').textContent = getEffectDescription(item.effect);
    
    // 显示道具图标
    document.getElementById('item-icon').innerHTML = `<i class="${item.icon}" style="font-size: 3rem; color: ${item.type === '负面道具' ? '#f44336' : item.type === '关键道具' ? '#ffd600' : '#1e88e5'};"></i>`;
    
    // 显示使用按钮
    const useButton = document.getElementById('use-item-btn');
    if (item.usable) {
        useButton.style.display = 'block';
        useButton.onclick = function() {
            useItem(item.id);
        };
    } else {
        useButton.style.display = 'none';
    }
    
    // 显示丢弃按钮
    const discardButton = document.getElementById('discard-item-btn');
    if (item.canDiscard !== false) {
        discardButton.style.display = 'block';
        discardButton.onclick = function() {
            discardItem(item.id);
        };
    } else {
        discardButton.style.display = 'none';
    }
    
    // 显示模态框
    document.getElementById('item-detail-modal').style.display = 'flex';
}

// 使用道具
function useItem(itemId) {
    const itemIndex = gameState.inventory.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    const item = gameState.inventory[itemIndex];
    
    // 应用效果
    applyEffects(item.effect);
    
    // 标记物品为已使用
    item.used = true;
    
    // 减少物品数量
    item.count--;
    if (item.count <= 0) {
        gameState.inventory.splice(itemIndex, 1);
    }
    
    // 显示使用结果
    showEventResult("使用道具", `你使用了${item.name}，${getEffectDescription(item.effect)}`);
    
    // 关闭模态框
    document.getElementById('item-detail-modal').style.display = 'none';
    
    // 更新UI
    updateUI();
}

// 丢弃道具
function discardItem(itemId) {
    const itemIndex = gameState.inventory.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    const item = gameState.inventory[itemIndex];
    
    // 减少物品数量
    item.count--;
    if (item.count <= 0) {
        gameState.inventory.splice(itemIndex, 1);
    }
    
    // 显示丢弃结果
    showEventResult("丢弃道具", `你丢弃了${item.name}`);
    
    // 关闭模态框
    document.getElementById('item-detail-modal').style.display = 'none';
    
    // 更新UI
    updateUI();
}

// 获得道具
function addItem(item) {
    // 检查是否已经有该物品
    const existingItem = gameState.inventory.find(i => i.id === item.id);
    
    if (existingItem) {
        // 增加数量
        existingItem.count++;
    } else {
        // 添加新物品
        gameState.inventory.push({ ...item, count: 1, used: false });
    }
    
    // 记录本学期获得的道具
    gameState.semesterItemsAcquired.push(item);
    
    // 显示获得道具通知
    showNotification(`获得道具: ${item.name}`);
    
    // 更新UI
    updateUI();
}