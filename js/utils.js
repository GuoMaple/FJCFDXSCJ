// 应用效果
function applyEffects(effects) {
    for (const [stat, value] of Object.entries(effects)) {
        if (gameState[stat] !== undefined) {
            gameState[stat] += value;
            // 确保数值在合理范围内
            if (stat === 'health') {
                gameState[stat] = Math.max(0, Math.min(100, gameState[stat]));
            } else if (stat === 'money') {
                gameState[stat] = Math.max(0, gameState[stat]);
            } else if (stat === 'credit') {
                gameState[stat] = Math.max(0, gameState[stat]);
            } else {
                gameState[stat] = Math.max(0, Math.min(100, gameState[stat]));
            }
        }
    }
}

// 获取数值名称
function getStatName(stat) {
    const statNames = {
        health: "生命值",
        money: "资金",
        credit: "学分",
        intelligence: "智力",
        social: "社交",
        exploration: "探索"
    };
    return statNames[stat] || stat;
}

// 获取效果描述
function getEffectDescription(effect) {
    const effects = [];
    for (const [stat, value] of Object.entries(effect)) {
        if (value > 0) {
            effects.push(`${getStatName(stat)}+${value}`);
        } else if (value < 0) {
            effects.push(`${getStatName(stat)}${value}`);
        }
    }
    return effects.length > 0 ? effects.join('，') : "无效果";
}

// 显示事件结果
function showEventResult(title, content) {
    document.getElementById('event-result-title').textContent = title;
    document.getElementById('event-result-content').innerHTML = content;
    document.getElementById('event-result-modal').style.display = 'flex';
}

// 显示通知
function showNotification(message) {
    const notification = document.getElementById('event-notification');
    notification.innerHTML = `<i class="fas fa-bell"></i> ${message}`;
    notification.style.display = 'flex';
    
    // 3秒后隐藏
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// 显示学期总结
function showSemesterSummary() {
    // 计算数值变化
    const statsChange = {
        health: gameState.health - gameState.semesterStartStats.health,
        money: gameState.money - gameState.semesterStartStats.money,
        credit: gameState.credit - gameState.semesterStartStats.credit,
        intelligence: gameState.intelligence - gameState.semesterStartStats.intelligence,
        social: gameState.social - gameState.semesterStartStats.social,
        exploration: gameState.exploration - gameState.semesterStartStats.exploration
    };
    
    // 计算总变化
    const totalChange = Object.values(statsChange).reduce((sum, value) => sum + value, 0);
    
    // 更新学期总结内容
    document.getElementById('semester-info-year').textContent = gameState.year;
    document.getElementById('semester-info-semester').textContent = gameState.semester;
    document.getElementById('semester-info-actions').textContent = gameState.semesterActions;
    document.getElementById('semester-info-npc').textContent = gameState.semesterNPCInteractions;
    
    // 更新数值变化表格
    const statsChangeTable = document.getElementById('stats-change-table');
    statsChangeTable.innerHTML = `
        <tr>
            <th>数值</th>
            <th>初始值</th>
            <th>结束值</th>
            <th>变化</th>
        </tr>
        <tr>
            <td>生命值</td>
            <td>${gameState.semesterStartStats.health}</td>
            <td>${gameState.health}</td>
            <td class="${statsChange.health > 0 ? 'stat-change-positive' : statsChange.health < 0 ? 'stat-change-negative' : 'stat-change-neutral'}">${statsChange.health > 0 ? '+' : ''}${statsChange.health}</td>
        </tr>
        <tr>
            <td>资金</td>
            <td>${gameState.semesterStartStats.money}</td>
            <td>${gameState.money}</td>
            <td class="${statsChange.money > 0 ? 'stat-change-positive' : statsChange.money < 0 ? 'stat-change-negative' : 'stat-change-neutral'}">${statsChange.money > 0 ? '+' : ''}${statsChange.money}</td>
        </tr>
        <tr>
            <td>学分</td>
            <td>${gameState.semesterStartStats.credit}</td>
            <td>${gameState.credit}</td>
            <td class="${statsChange.credit > 0 ? 'stat-change-positive' : statsChange.credit < 0 ? 'stat-change-negative' : 'stat-change-neutral'}">${statsChange.credit > 0 ? '+' : ''}${statsChange.credit}</td>
        </tr>
        <tr>
            <td>智力</td>
            <td>${gameState.semesterStartStats.intelligence}</td>
            <td>${gameState.intelligence}</td>
            <td class="${statsChange.intelligence > 0 ? 'stat-change-positive' : statsChange.intelligence < 0 ? 'stat-change-negative' : 'stat-change-neutral'}">${statsChange.intelligence > 0 ? '+' : ''}${statsChange.intelligence}</td>
        </tr>
        <tr>
            <td>社交</td>
            <td>${gameState.semesterStartStats.social}</td>
            <td>${gameState.social}</td>
            <td class="${statsChange.social > 0 ? 'stat-change-positive' : statsChange.social < 0 ? 'stat-change-negative' : 'stat-change-neutral'}">${statsChange.social > 0 ? '+' : ''}${statsChange.social}</td>
        </tr>
        <tr>
            <td>探索</td>
            <td>${gameState.semesterStartStats.exploration}</td>
            <td>${gameState.exploration}</td>
            <td class="${statsChange.exploration > 0 ? 'stat-change-positive' : statsChange.exploration < 0 ? 'stat-change-negative' : 'stat-change-neutral'}">${statsChange.exploration > 0 ? '+' : ''}${statsChange.exploration}</td>
        </tr>
    `;
    
    // 更新获得的道具
    const itemsAcquiredContainer = document.getElementById('items-acquired-container');
    itemsAcquiredContainer.innerHTML = '';
    
    if (gameState.semesterItemsAcquired.length === 0) {
        itemsAcquiredContainer.innerHTML = '<div style="color: #999; font-style: italic;">本学期未获得任何道具</div>';
    } else {
        // 统计道具数量
        const itemCounts = {};
        gameState.semesterItemsAcquired.forEach(item => {
            if (itemCounts[item.id]) {
                itemCounts[item.id].count++;
            } else {
                itemCounts[item.id] = { ...item, count: 1 };
            }
        });
        
        // 显示道具
        Object.values(itemCounts).forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-acquired';
            itemElement.innerHTML = `
                <div class="item-acquired-icon" style="background: ${item.type === '负面道具' ? '#ffebee' : item.type === '关键道具' ? '#fffde7' : '#f5f9ff'};">
                    <i class="${item.icon}" style="color: ${item.type === '负面道具' ? '#f44336' : item.type === '关键道具' ? '#ffd600' : '#1e88e5'};"></i>
                </div>
                <div>
                    <div class="item-acquired-name">${item.name}</div>
                    <div class="item-acquired-count">x${item.count}</div>
                </div>
            `;
            itemsAcquiredContainer.appendChild(itemElement);
        });
    }
    
    // 更新学期评价
    const evaluationContainer = document.getElementById('semester-evaluation');
    evaluationContainer.innerHTML = generateSemesterEvaluation(totalChange);
    
    // 显示学期总结模态框
    document.getElementById('semester-summary-modal').style.display = 'flex';
}

// 生成学期评价
function generateSemesterEvaluation(totalChange) {
    let evaluation = "";
    
    if (totalChange > 50) {
        evaluation = `<p><strong>优秀表现！</strong> 你在本学期的表现非常出色，各项数值都有显著提升。继续保持这种状态，你一定能成为校园传奇！</p>`;
    } else if (totalChange > 20) {
        evaluation = `<p><strong>良好表现！</strong> 你在本学期的表现不错，大多数数值都有所提升。再接再厉，你正在向优秀毕业生迈进！</p>`;
    } else if (totalChange > 0) {
        evaluation = `<p><strong>平稳度过！</strong> 你平稳度过了这个学期，虽然进步不大，但也没有退步。下个学期要更加努力哦！</p>`;
    } else if (totalChange > -20) {
        evaluation = `<p><strong>需要努力！</strong> 这个学期你的表现有些不尽如人意，部分数值有所下降。下个学期要调整策略，更加努力才行！</p>`;
    } else {
        evaluation = `<p><strong>危险警告！</strong> 这个学期你的表现很不理想，多项数值大幅下降。如果不及时调整，可能会面临肄业的风险！</p>`;
    }
    
    // 添加学分检查
    const requiredCredits = 5 * (gameState.semester + (gameState.year - 1) * 2);
    if (gameState.credit < requiredCredits) {
        evaluation += `<p style="color: #f44336; margin-top: 10px;"><i class="fas fa-exclamation-triangle"></i> <strong>警告：</strong>你的学分(${gameState.credit})未达到要求(${requiredCredits})，下学期需要补考！</p>`;
    } else {
        evaluation += `<p style="color: #4caf50; margin-top: 10px;"><i class="fas fa-check-circle"></i> <strong>好消息：</strong>你的学分已达到要求，可以顺利进入下一学期！</p>`;
    }
    
    // 添加道具收集评价
    const positiveItems = gameState.semesterItemsAcquired.filter(item => item.type === "增益道具").length;
    const negativeItems = gameState.semesterItemsAcquired.filter(item => item.type === "负面道具").length;
    
    if (positiveItems > negativeItems * 2) {
        evaluation += `<p><i class="fas fa-gift"></i> 你收集了很多有用的道具，这会对你的大学生活有很大帮助！</p>`;
    } else if (negativeItems > positiveItems) {
        evaluation += `<p><i class="fas fa-skull"></i> 你收集了不少负面道具，使用时请务必小心！</p>`;
    }
    
    return evaluation;
}

// 触发随机事件
function triggerRandomEvent() {
    const events = [
        {
            title: "意外发现",
            description: "你在校园里发现了一个钱包，里面有一些现金。",
            effect: { money: 25, social: 5 }
        },
        {
            title: "突然下雨",
            description: "突然下起了大雨，你被淋湿了，感到有些不适。",
            effect: { health: -10 }
        },
        {
            title: "遇到老同学",
            description: "你遇到了高中同学，你们聊了很久，感到很开心。",
            effect: { social: 15, health: 5 }
        },
        {
            title: "考试失利",
            description: "你在考试中表现不佳，感到很沮丧。",
            effect: { intelligence: -10, credit: -5, health: -5 }
        },
        {
            title: "获得奖学金",
            description: "你获得了奖学金，感到非常开心。",
            effect: { money: 50, intelligence: 10, credit: 10 }
        }
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    
    // 应用效果
    applyEffects(randomEvent.effect);
    
    // 显示事件结果
    showEventResult(randomEvent.title, randomEvent.description);
    
    // 更新UI
    updateUI();
}

// 更新对话
function updateDialogue(speaker, content) {
    const dialogueElement = document.getElementById('scene-dialogue');
    dialogueElement.innerHTML = `
        <div class="speaker"><i class="fas fa-user"></i> ${speaker}</div>
        <div class="dialogue-content">${content}</div>
    `;
}