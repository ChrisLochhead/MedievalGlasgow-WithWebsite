function LoadFloor(gameScene)
{
    // Tilesets for the maps
    gameScene.load.image('walls1_trans', 'Game/img/maps/tilesets/walls1_trans.png');
    gameScene.load.image('walls1', 'Game/img/maps/tilesets/walls1.png');
    gameScene.load.image('walls2', 'Game/img/maps/tilesets/walls2.png');
    gameScene.load.image('walls3', 'Game/img/maps/tilesets/walls3.png');
    gameScene.load.image('floor1', 'Game/img/maps/tilesets/floor1.png');
    gameScene.load.image('roofs1', 'Game/img/maps/tilesets/roofs1.png');
    gameScene.load.image('interior1', 'Game/img/maps/tilesets/interior1.png');
    gameScene.load.image('interior2', 'Game/img/maps/tilesets/interior2.png');
    gameScene.load.image('interior4', 'Game/img/maps/tilesets/interior4.png');
    gameScene.load.image('interior5', 'Game/img/maps/tilesets/interior5.png');
    gameScene.load.image('ships2', 'Game/img/maps/tilesets/ships2.png');
    gameScene.load.image('nature1', 'Game/img/maps/tilesets/nature1.png');
    gameScene.load.image('nature2', 'Game/img/maps/tilesets/nature2.png');
    gameScene.load.image('forage2', 'Game/img/maps/tilesets/forage2.png');
    gameScene.load.image('statues1', 'Game/img/maps/tilesets/statues1.png');
    

    // Maps
    gameScene.load.tilemapTiledJSON('mainmap', 'Game/img/maps/mainmap.json');
    gameScene.load.tilemapTiledJSON('blacksmith', 'Game/img/maps/blacksmith.json');
    gameScene.load.tilemapTiledJSON('generalgoods', 'Game/img/maps/generalgoods.json');
    gameScene.load.tilemapTiledJSON('gandomanor', 'Game/img/maps/gandomanor.json');
    gameScene.load.tilemapTiledJSON('cave', 'Game/img/maps/cave.json');
    gameScene.load.tilemapTiledJSON('tower', 'Game/img/maps/tower.json');
}
function LoadGameAssets(gameScene)
{
    //Load sprites for inventory items

    //Load Game Asset sprite sheet


    //Load equip-able items
    gameScene.load.image('default-helmet', "Game/img/assets/helmet1.png");
    gameScene.load.image('second-helmet', "Game/img/assets/helmet2.png");
    gameScene.load.image('default-chestplate', "Game/img/assets/chest1.png");
    gameScene.load.image('default-legs', "Game/img/assets/boots1.png");
    gameScene.load.image('default-weapon', "Game/img/assets/sword1.png");
    gameScene.load.image('default-offhand', "Game/img/assets/shield1.png");

    //load consumable items
    gameScene.load.image('health-potion', "Game/img/assets/healthpotion.png");
    gameScene.load.image('mana-potion', "Game/img/assets/manapotion.png");

    //Load body items
    gameScene.load.image('default-weapon-body', "Game/img/Sword-Body.png");
    gameScene.load.image('default-chestplate-body', "Game/img/Default-Chestplate-Body.png");
    gameScene.load.image('default-offhand-body', "Game/img/Shield-Body.png");
    gameScene.load.image('default-helmet-body', "Game/img/Default-Helmet-Body.png");
    gameScene.load.image('second-helmet-body', "Game/img/Default-Helmet-Body.png");

    //load NPCs
    gameScene.load.image('npc', "Game/img/NPC.png");
    gameScene.load.image('npc2', "Game/img/NPC2.png");
    gameScene.load.image('npc3', "Game/img/NPC3.png");
    gameScene.load.image('shopkeeper', "Game/img/ShopKeeper.png");
    gameScene.load.image('enemy1', "Game/img/Enemy1.png");
    gameScene.load.image('nicklaw', "Game/img/Nicklaws.png");

    //Load shop info
    gameScene.load.image('shopbackground', "Game/img/panel-shop.png");
    gameScene.load.text('shop1', "Game/txt/Shop1.txt");
    gameScene.load.text('shop2', "Game/txt/Shop2.txt");

    //Load
    gameScene.load.image('fireball', "Game/Img/FireBall.png");
}
function LoadPlayerAssets(gameScene)
{
    //load inventory, gear and quests UI
    gameScene.load.image('inventory', "Game/img/panel-inventory.png");
    gameScene.load.image('gear', "Game/img/panel-equipment.png");
    gameScene.load.image('quests', "Game/img/panel-quest.png");

    gameScene.load.image('inventorytoggle', "Game/img/desBtn-inventory.png");
    gameScene.load.image('geartoggle', "Game/img/desBtn-equipment.png");
    gameScene.load.image('gearbutton', "Game/img/GearButton.png");
    gameScene.load.image('questtoggle', "Game/img/desBtn-quests.png");

    gameScene.load.image('player1Select', "Game/img/desBtn_player1Select.png");
    gameScene.load.image('player2Select', "Game/img/desBtn_player2Select.png");
    gameScene.load.image('player1Deselect', "Game/img/desBtn_player1Deselect.png");
    gameScene.load.image('player2Deselect', "Game/img/desBtn_player2Deselect.png");

    //load chatbox and notifications
    gameScene.load.image('chatbox', "Game/img/chatBox-Open.png");
    gameScene.load.image('chatboxclosebutton', "Game/img/chatBox-MinButton.png");
    gameScene.load.image('chatboxclosed', "Game/img/chatBox-Closed.png");

    //For notifications and quest dialogues
    gameScene.load.image('notificationbox', "Game/img/NotificationBox.png");

    //load stat bars
    gameScene.load.image('status-bars', "Game/img/HealthMana-Bars.png");
    gameScene.load.image('health-bar', "Game/img/Health-Bar.png");
    gameScene.load.image('mana-bar', "Game/img/Mana-Bar.png");

    //load our hero
    gameScene.load.image('gareth', 'Game/img/Gareth.png');
    gameScene.load.image('dave', 'Game/img/David.png');
    gameScene.load.image('gando', 'Game/img/Gando.png');
}
