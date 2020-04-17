class Equipment {
    constructor(inventSprite, attk, mgdef, medef, hb, mb, t, sp, cp) {
        //Sprite and collider management
        this.inventorySprite = inventSprite;
        this.inventorySprite.parent = this;
        //Bonuses
        this.attackBonus = attk;
        this.mageDefence = mgdef;
        this.meleeDefence = medef;
        this.healthBonus = hb;
        this.manaBonus = mb;
        this.itemType = t;
        this.shopPrice = sp;
        this.characterPrice = cp;

        //Associated price in shops
        this.itemPriceText = null;
    }
}

class Weapon {
    constructor(inventSprite, mgdef, medef, npcs, gameScene, isRanged, rangespr, owner, enemies) {
        //Sprite and collider management
        this.bodySprite = inventSprite;
        this.bodySprite.parent = this;

        //Bonuses
        this.mageDefence = mgdef;
        this.meleeDefence = medef;

        //Assign a reference to game scene
        this.gameScene = gameScene;

        //Definitions of weapon type
        this.ranged = isRanged;
        this.isAttacking = false;
        this.rangeSprite = rangespr;
        this.isRangedAttacking = false;
        this.rangedAttacks = [];
        this.owner = owner;

        //reference for self and assign appropriate colliders fro NPCs and enemies
        let self = this;
        if(npcs != null)
        gameScene.physics.add.collider(this.bodySprite, npcs, function(me, gameObject){self.Attack(me, gameObject)}, null, self);

        this.enemies = enemies;
        if(this.enemies != null)
            gameScene.physics.add.collider(this.bodySprite, enemies, function(me, gameObject){self.Attack(me, gameObject)}, null, self);
    }

    //Manages attacks
    Attack(self, gameObject) {
        //Check parent is currently attacking and opponent is damageable
        if (self.parent.isAttacking && gameObject.parent.canBeDamaged == true) {

            //Apply damage
            console.log(self.parent.owner.attackBonus);
            gameObject.parent.TakeDamage(self.parent.owner.attackBonus);
            //If dead, destroy the character
            if (gameObject.parent.health <= 0) {
                self.parent.owner.UpdateUIMoney(gameObject.parent.cashDrop);
                gameObject.parent.Destruct();
            } else {
                //Otherwise activate damage visual effect
                gameObject.parent.isDamaged = true;
            }
            //Set to false to manage attack rate
            self.parent.isAttacking = false;
        }
    }

    Update()
    {
        //Check if ranged attacking and character has mana to commit to attack
        if(this.isRangedAttacking && this.owner.mana >= 20 - this.owner.manaBonus)
        {
            //Create a ranged attack and add it to the container
            this.rangedAttacks.push(new RangedAttack(this.gameScene.physics.add.sprite(this.bodySprite.x, this.bodySprite.y, this.rangeSprite), 30, this.owner.moveDirection, 100, 5, this.enemies, this.gameScene));

            //Deduct appropriate mana points
            let newM = this.owner.mana - (20 + this.owner.manaBonus);
            this.owner.mana = newM;
            this.isRangedAttacking = false;
        }

        //Cycle through and update ranged attacks
        for(let i = 0; i < this.rangedAttacks.length; i++)
        {
            if(this.rangedAttacks[i] != null)
                this.rangedAttacks[i].Update();
        }
    }
}

class RangedAttack{
    constructor(spr, speed, dir, dropoff, dmg, enemies, gamescene) {
        //Sprite management
        this.bodySprite = spr;
        this.bodySprite.parent = this;
        //Stats
        this.speed = speed;
        this.dropOff = dropoff;
        this.damage = dmg;
        //Position
        this.direction = dir;
        this.originalPosition = [this.bodySprite.x, this.bodySprite.y];
        //Colliders to check against
        this.enemies = enemies;
        this.gameScene = gamescene;
        //left-right-up-down
        if(this.direction == 1)
        this.bodySprite.setVelocityX(-speed);
        else if(this.direction == 2)
            this.bodySprite.setVelocityX(speed);
        else if(this.direction == 3)
            this.bodySprite.setVelocityY(-speed);
        else if(this.direction == 4)
            this.bodySprite.setVelocityY(speed);

        let self = this;
        //Assign enemy colliders
        if(this.enemies != null)
            this.gameScene.physics.add.collider(this.bodySprite, this.enemies, function(me, gameObject){self.Collide(me, gameObject)}, null, self);

    }

    Collide(me, gameObject)
    {
        //Inflict damage
        gameObject.parent.TakeDamage(me.parent.damage);
        if(gameObject.parent.health <= 0)
            gameObject.parent.Destruct();
        else
            gameObject.parent.isDamaged = true;
        //Delete
        me.parent.Destruct();
    }

    Destruct()
    {
        //Simple destruct function
        this.bodySprite.destroy();
        delete this;
    }

    Update()
    {
        //Update and destroy if it is beyond range boundary.
        if(this.direction == 1 && this.bodySprite.x < this.originalPosition[0] - this.dropOff) this.Destruct();
        if(this.direction == 2 && this.bodySprite.x > this.originalPosition[0] + this.dropOff) this.Destruct();
        if(this.direction == 3 && this.bodySprite.y < this.originalPosition[1] - this.dropOff) this.Destruct();
        if(this.direction == 4 && this.bodySprite.y > this.originalPosition[1] + this.dropOff) this.Destruct();

    }
}