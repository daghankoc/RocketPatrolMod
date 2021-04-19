// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, playernumber) {
      super(scene, x, y, texture,  playernumber);

      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.playernumber = playernumber;
      
    }
    update() {
        
        //left or right
        if(!this.isFiring && this.playernumber == 1){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        if(!this.isFiring && this.playernumber == 2){
            if(keyA.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            } else if (Phaser.Input.Keyboard.JustDown(keyW))
            {
                console.log("shot p2");
                this.isFiring = true;
                this.sfxRocket.play();
            }
        }
        //firing button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring && this.playernumber == 1) {
            console.log("shot p1");
            this.isFiring = true;
            this.sfxRocket.play(); 
        }
       
        //move up
        if(this.isFiring && this.y >=borderUISize * 3 + borderPadding && this.playernumber == 1){
            this.y -= this.moveSpeed;
        }
        if(this.isFiring && this.y >=borderUISize * 3 + borderPadding && this.playernumber == 2){
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}