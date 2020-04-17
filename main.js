// Phaser Scripting
var config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    canvasStyle: 'display: block; margin: 0 auto;',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render,
}
};

class Equipment {
    constructor(inventSprite, mgdef, medef, t) {
        this.inventorySprite = inventSprite;
        this.mageDefence = mgdef;
        this.meleeDefence = medef;
        this.type = t;
    }
}

class Player{
    constructor(spr, healthspr, neghealth, healthtxt, manaspr, negmana, manatxt, quests) {
        this.meleeDefence = 0;
        this.mageDefence = 0;
        this.inventoryItems = [];
        this.gearItems = [];
        this.currentFlickBookIndex = 0;
        this.characterSprite = spr;

        //Setup healthbar positioning
        this.healthbar = healthspr;
        this.healthbar.setScrollFactor(0);
        this.healthbarText = healthtxt;
        this.healthbarText.setScrollFactor(0);
        this.health = parseInt(healthtxt._text);

        this.healthbarNegative = neghealth;
        this.healthbarNegative.setScrollFactor(0);
        this.healthbarNegative.setCrop(0,0,((100-this.health)/100) * 200,32);

        //Setup mana positioning
        this.manabar = manaspr;
        this.manabar.setScrollFactor(0);
        this.manabartext = manatxt;
        this.manabartext.setScrollFactor(0);
        this.mana = parseInt(manatxt._text);

        this.manabarNegative = negmana;
        this.manabarNegative.setScrollFactor(0);
        this.manabarNegative.setCrop(0,0,((100-this.mana)/100) * 200,32);

        //Setup Quest List
        this.QuestList = quests;

    }

}

let game = new Phaser.Game(config);

const radianConverter = (3.14/180);

let player1, cursors, inventory, chatbox, chatboxCloseButton, notificationBox, notificationBoxCloseButton,
    inventoryToggle, gearToggle, questToggle;


function preload ()
{
    //Load floor tiles
    this.load.image('grass1', 'img/GrassTile01.png');
    this.load.image('grass2', 'img/GrassTile02.png');
    this.load.image('grass3', 'img/GrassTile03.png');
    this.load.image('grass4', 'img/GrassTile04.png');

    //load inventory
    this.load.image('inventory', "img/Inventory.png");
    this.load.image('gear', "img/Gear.png");
    this.load.image('quests', "img/QuestList.png");

    this.load.image('inventorytoggle', "img/InventoryToggleButton.png");
    this.load.image('geartoggle', "img/GearToggleButton.png");
    this.load.image('questtoggle', "img/QuestToggleButton.png");

    //load chatbox and notifications
    this.load.image('chatbox', "img/ChatBox.png");
    this.load.image('chatboxclosebutton', "img/ChatBox-CloseButton.png");
    this.load.image('chatboxclosed', "img/ChatBox-Closed.png");

    this.load.image('notificationbox', "img/NotificationBox.png");
    //load our hero
    this.load.image('gareth', 'img/Gareth.png');

    //load sprites for inventory items
    this.load.image('default-helmet', "img/Hat-Inventory.png");
    this.load.image('second-helmet', "img/Hat-Inventory-Alternate.png");
    this.load.image('default-chestplate', "img/Shirt-Inventory.png");
    this.load.image('default-legs', "img/Legs-Inventory.png");
    this.load.image('default-weapon', "img/Sword-Inventory.png");
    this.load.image('default-offhand', "img/Shield-Inventory.png");


    //load stat bars
    this.load.image('health', "img/health.png");
    this.load.image('health-negative', "img/health-negative.png");
    this.load.image('mana', "img/mana.png");
    this.load.image('mana-negative', "img/mana-negative.png");


}

function create ()
{
    //draw a floor
    for(let i = 0; i < 63; i++){
        for(let j = 0; j < 63; j++){
            let temp = Math.floor(Math.random() * 4) + 1;
            this.add.image(16 + (i*32), 16 + (j*32), 'grass' + temp);
        }
    }
    //game.world.setBounds(0, 0, 2000, 2000);
    //initialise quests
    let questOne = this.add.text(1005, 330, 'One Small Flavour', 1).setInteractive().setVisible(false).setDepth(1).setName('Quest-1').setScrollFactor(0);
    let questTwo = this.add.text(1005, 360, 'Get Them Meds', 1).setInteractive().setVisible(false).setDepth(1).setName('Quest-2').setScrollFactor(0);
    let questThree = this.add.text(1005, 390, 'The Ny-Claws', 1).setInteractive().setVisible(false).setDepth(1).setName('Quest-3').setScrollFactor(0);
    let questFour = this.add.text(1005, 420, 'Revenge', 1).setInteractive().setVisible(false).setDepth(1).setName('Quest-4').setScrollFactor(0);

    //Arrange into an array for the player
    let questList = [questOne, questTwo, questThree, questFour];

    //setup player
    player1 = new Player(this.add.image(400, 300, 'gareth'), this.add.image(1085, 20, 'health'), this.add.image(1085, 20, 'health-negative'),
        this.add.text(1155, 12.5, '10'), this.add.image(1085, 60, 'mana'), this.add.image(1085, 60, 'mana-negative'), this.add.text(1155, 52.5, '70'),
        questList);
    //Set camera boundaries
    this.cameras.main.setBounds(0, 0, 2000, 2000);
    //Set camera to follow the first player
    this.cameras.main.startFollow(player1.characterSprite);

    //setup inventory
    inventory = this.add.sprite(1085, 415, 'inventory');
    inventory.setScrollFactor(0);

    inventoryToggle = this.add.sprite(1018, 256, 'inventorytoggle', 1).setInteractive();
    inventoryToggle.setScrollFactor(0);
    inventoryToggle.name = "inventorytoggle";
    gearToggle = this.add.sprite(1084, 256, 'geartoggle', 1).setInteractive();
    gearToggle.setScrollFactor(0);
    gearToggle.name = "geartoggle";
    questToggle = this.add.sprite(1151, 256, 'questtoggle', 1).setInteractive();
    questToggle.setScrollFactor(0);
    questToggle.name = "questtoggle";

    //Initialise players gear to be empty
    for(let i = 0; i < player1.gearItems.length; i++)
    {
        player1.gearItems[i].inventorySprite.name = 'null';
    }


    //add initial items
    addItemToInventory = (item, indexX, indexY, mageDef, melDef, type) => {
        //Setup new item by its sprite
        let tmpSprite = this.add.sprite(1025 + (indexX * 60) , 335 + (indexY * 50), item, 1).setInteractive()
        tmpSprite.setScrollFactor(0);
        tmpSprite.name = item.toString() + '-' + (indexX + (indexY * 3));

        player1.inventoryItems[indexX + (indexY * 3)] = new Equipment(tmpSprite, mageDef, melDef, type);
    }

    showInventory = (isShowing) => {
        for(let i = 0; i < 15; i++) {
            if(player1.inventoryItems[i]) {
                if (player1.inventoryItems[i].inventorySprite.name != 'null') {
                    player1.inventoryItems[i].inventorySprite.visible = isShowing;
                }
            }
        }
    }

    showQuests = (isShowing) => {
        for(let i = 0; i < 15; i++) {
            if(player1.QuestList[i]) {
                player1.QuestList[i].visible = isShowing;
            }
        }
    }

    showGear = (isShowing) => {
        for(let i = 0; i < player1.gearItems.length; i++) {
            if(player1.gearItems[i]) {
                if (player1.gearItems[i].inventorySprite.name != 'null') {
                    player1.gearItems[i].inventorySprite.visible = isShowing;
                }
            }
        }
    }
    addGear = (index, itemName) => {

        let isReplaced = false;
        let indexPosition;
        indexPosition = itemName.split('-');
        let intIndexPosition = parseInt(indexPosition[2].toString());
        //if there is already a equip item of the same index equipped
        if(player1.gearItems[index]) {
            if (player1.gearItems[index].inventorySprite.name != 'null') {
                let xPos = intIndexPosition % 3;
                let yPos = intIndexPosition / 3;
                yPos = parseInt(yPos.toString());

                let existingGearNameArray = player1.gearItems[index].inventorySprite.name.split('-');
                let existingGearName = existingGearNameArray[0] + '-' + existingGearNameArray[1];
                //replace in position
                let tmpSprite = this.add.sprite(1025 + (xPos* 60) , 335 + (yPos * 50), existingGearName, 1).setInteractive()
                tmpSprite.setScrollFactor(0);
                tmpSprite.name = existingGearName + '-' + intIndexPosition;

                player1.inventoryItems[intIndexPosition] =  new Equipment(tmpSprite);
                player1.inventoryItems[intIndexPosition].inventorySprite.visible = true;
                player1.gearItems[index].inventorySprite.name = 'null';
                isReplaced = true;
            }
        }
        let equipNameArray = itemName.split('-');
        let equipName = equipNameArray[0] + '-' + equipNameArray[1];

        //Find gear index
        let gearIndex = getGearIndex(index);
        let tmpSprite = this.add.sprite(gearIndex[0], gearIndex[1], equipName, 1).setInteractive()

        tmpSprite.setScrollFactor(0);
        tmpSprite.name = equipName.toString() + '-' + index;

        player1.gearItems[index] = new Equipment(tmpSprite);
        player1.gearItems[index].inventorySprite.name = itemName + '-' + index;
        player1.gearItems[index].inventorySprite.setScrollFactor(0);
        player1.gearItems[index].inventorySprite.visible = false;

        if(!isReplaced) {
            player1.inventoryItems[intIndexPosition].inventorySprite.name = 'null';
            player1.inventoryItems[intIndexPosition].inventorySprite.visible = false;
        }
    }

    removeGear = (index, itemName) => {
        let successfullyRemoved = false;
        for(let i = 0; i < player1.inventoryItems.length; i++){
            if(player1.inventoryItems[i].inventorySprite.name == 'null')
            {

                let xPos = i % 3;
                let yPos = i / 3;
                yPos = parseInt(yPos);
                let itemNameArray = itemName.split('-');
                let itemNameCombined = itemNameArray[0] + '-' + itemNameArray[1];

                let tmpSprite = this.add.sprite(1025 + (xPos* 60) , 335 + (yPos * 50), itemNameCombined, 1).setInteractive();
                tmpSprite.setScrollFactor(0);
                tmpSprite.name = itemNameCombined.toString() + '-' + i;

                player1.inventoryItems[i] = new Equipment(tmpSprite);
                player1.inventoryItems[i].inventorySprite.visible = false;

                player1.gearItems[index].inventorySprite.name = 'null';
                successfullyRemoved = true;
                break;
            }
        }
        return successfullyRemoved;
    }

    //default inventory
    addItemToInventory('default-helmet', 0, 0, 3, 10, 0);
    addItemToInventory('second-helmet', 1, 0, 3, 10, 0);
    addItemToInventory('default-chestplate', 2, 0, 3, 10, 1);
    addItemToInventory('default-legs', 0, 1, 3, 10, 2);
    addItemToInventory('default-weapon', 1, 1, 3, 10, 3);
    addItemToInventory('default-offhand', 2, 1, 3, 10, 4);

    //Setup chatbox and notification box
    chatbox = this.add.sprite(385, 500, 'chatbox');
    chatbox.name = "chatbox";
    chatbox.setScrollFactor(0);

    chatboxCloseButton = this.add.sprite(732, 432, 'chatboxclosebutton', 1).setInteractive();
    chatboxCloseButton.name = "chatboxclosebutton";
    chatboxCloseButton.setScrollFactor(0);

    notificationBox = this.add.sprite(385, 200, 'notificationbox', 1).setInteractive();
    notificationBox.name = "notificationbox";
    notificationBox.setScrollFactor(0);
    notificationBox.setVisible(false);

    notificationBoxCloseButton = this.add.sprite(545, 105, 'chatboxclosebutton', 1).setInteractive().setScrollFactor(0)
        .setVisible(false).setName('notificationboxclosebutton');


    this.input.on('gameobjectdown', function (pointer, button)
    {
        if(button.name == "chatboxclosebutton"){
            button.input.enabled = false;
            button.visible = false;
            chatbox.setTexture('chatboxclosed');
            chatbox.y += 79;
            chatbox.setInteractive();
        }else
            if(button.name == 'chatbox')
            {
                chatbox.setTexture('chatbox');
                chatbox.input.enabled = false;
                chatboxCloseButton.input.enabled = true;
                chatboxCloseButton.visible = true;
                chatbox.y -= 79;
            }
        else
            if(button.name == 'notificationboxclosebutton')
            {
                notificationBox.setVisible(false);
                notificationBoxCloseButton.setVisible(false);
            }
        else
        if(button.name == "questtoggle"){
            inventory.setTexture('quests');
            if(player1.currentFlickBookIndex == 0)
                showInventory(false);

            if(player1.currentFlickBookIndex == 1)
                showGear(false);

            showQuests(true);
            player1.currentFlickBookIndex = 2;
        }else
        if(button.name == "geartoggle"){
            inventory.setTexture('gear');
            if(player1.currentFlickBookIndex == 0)
                showInventory(false);
            else if(player1.currentFlickBookIndex == 2)
                showQuests(false);

            showGear(true);
            player1.currentFlickBookIndex = 1;
        }else
        if(button.name == "inventorytoggle"){
            inventory.setTexture('inventory');

            if(player1.currentFlickBookIndex == 1)
                showGear(false);
            else if(player1.currentFlickBookIndex == 2)
                showQuests(false);

            player1.currentFlickBookIndex = 0;
            showInventory(true);
        }
        else
        {

            //Check the item type
            let tempname = button.name.split('-');

            if(player1.currentFlickBookIndex == 0) {
                //Equip item
                addGear(getEquipmentIndex(tempname[1]), button.name);
                //Destroy item still in inventory
                button.destroy();
            }
            else
            if(player1.currentFlickBookIndex == 1) {
                //Un-equip item
                removeGear( getEquipmentIndex(tempname[1]), button.name);
                //Destroy instance in the gear tab
                button.destroy();
            }
            else
            if(player1.currentFlickBookIndex == 2) {
                //Check if quest buttons pressed
                notificationBox.setVisible(true);
                notificationBoxCloseButton.setVisible(true);
            }
        }
    });

    //enable cursor input
    cursors = this.input.keyboard.createCursorKeys();

}
function getEquipmentIndex(itemName)
{
    if(itemName == 'helmet')
        return 0;
    if(itemName == 'chestplate')
        return 1;
    if(itemName == "legs")
        return 2;
    if(itemName == 'offhand')
        return 3;
    if(itemName == 'weapon')
        return 4;
}

function getGearIndex(index)
{
    if(index == 0)
        return [1087.5, 350];
    if(index == 1)
        return [1087.5, 416];
    if(index == 2)
        return [1087.5, 480];
    if(index == 3)
        return [1145, 416];
    if(index == 4)
        return [1028, 416];

    return [0,0];
}
function update() {
    if (cursors.left.isDown) {
        player1.characterSprite.x -= 2;
        player1.characterSprite.rotation = -90 * radianConverter;
    }
    if (cursors.right.isDown) {
        player1.characterSprite.x += 2;
        player1.characterSprite.rotation = 90 * radianConverter;
    }
    if (cursors.up.isDown) {
        player1.characterSprite.y -= 2;
        player1.characterSprite.rotation = 0 * radianConverter;
    }
    if (cursors.down.isDown) {
        player1.characterSprite.y += 2;
        player1.characterSprite.rotation = 180 * radianConverter;
    }
}

function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
}