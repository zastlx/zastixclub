import {
    useEffect,
    useRef
} from "react";
import { useScreenSize } from "../utils";

export default () => {
    const canvasRef = useRef <HTMLCanvasElement>(null);
    const [screenWidth, screenHeight] = useScreenSize();

    useEffect(() => {
        if (!canvasRef.current) return;

        function lineToAngle(x1: number, y1: number, length: number, radians: number) {
            return {
                x: x1 + length * Math.cos(radians),
                y: y1 + length * Math.sin(radians)
            };
        }

        function randomRange(min: number, max: number) {
            return min + Math.random() * (max - min);
        }

        function degreesToRads(degrees: number) {
            return degrees / 180 * Math.PI;
        }

        class Star {
            x = 0;
            y = 0;
            vx = 0;
            vy = 0;
            radius = 0;
            opacity = 0;
            trailLengthDelta = 0;
            isSpawning: boolean;
            isDying: boolean;
            isDead = false;

            constructor(x: number, y: number, speed: number, direction: number, isSpawning ? : boolean, isDying ? : boolean) {
                this.x = x;
                this.y = y;
                this.vx = Math.cos(direction) * speed;
                this.vy = Math.sin(direction) * speed;
                this.isSpawning = isSpawning || false;
                this.isDying = isDying || false;
            }

            getHeading(): number {
                return Math.atan2(this.vy, this.vx);
            }

            setHeading(heading: number): void {
                const speed = this.getSpeed();
                this.vx = Math.cos(heading) * speed;
                this.vy = Math.sin(heading) * speed;
            }

            getSpeed(): number {
                return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            }

            setSpeed(speed: number): void {
                const heading = this.getHeading();
                this.vx = Math.cos(heading) * speed;
                this.vy = Math.sin(heading) * speed;
            }

            update(): void {
                this.x += this.vx;
                this.y += this.vy;
            }
        }

        //Canvas and settings
        let canvas = canvasRef.current;
        let context = canvas.getContext("2d");
        const width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight;
        let stars: Star[] = [];
        let shootingStars: Star[] = [];
        let anim: number;
        let paused = false;
        const layers = [{
                    speed: 0.015,
                    scale: 0.2,
                    count: 320
                },
                {
                    speed: 0.03,
                    scale: 0.5,
                    count: 50
                },
                {
                    speed: 0.05,
                    scale: 0.75,
                    count: 30
                }
            ],
            starsAngle = 145,
            shootingStarSpeed = {
                min: 15,
                max: 20
            },
            shootingStarOpacityDelta = 0.02,
            trailLengthDelta = 0.02,
            shootingStarEmittingInterval = 500,
            shootingStarLifeTime = 500,
            maxTrailLength = 300,
            starBaseRadius = 3,
            shootingStarRadius = 4;

        for (let j = 0; j < layers.length; j += 1) {
            let layer = layers[j];
            for (let i = 0; i < layer.count; i += 1) {
                let star = new Star(randomRange(0, width), randomRange(0, height), 0, 0);
                star.radius = starBaseRadius * layer.scale;
                star.setSpeed(layer.speed);
                star.setHeading(degreesToRads(starsAngle));
                stars.push(star);
            }
        }

        function createShootingStar() {
            let shootingStar = new Star(randomRange(width / 2, width), randomRange(0, height / 2), 0, 0, true, false);
            shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
            shootingStar.setHeading(degreesToRads(starsAngle));
            shootingStar.radius = shootingStarRadius;
            shootingStars.push(shootingStar);
        }

        function killShootingStar(shootingStar: Star) {
            setTimeout(() => shootingStar.isDying = true, shootingStarLifeTime);
        }

        function update() {
            if (context && !paused) {

                context.clearRect(0, 0, width, height);
                context.fillStyle = "#000";
                context.fillRect(0, 0, width, height);
                context.fill();

                for (var i = 0; i < stars.length; i += 1) {
                    var star = stars[i];
                    star.update();
                    drawStar(star);
                    if (star.x > width) {
                        star.x = 0;
                    }
                    if (star.x < 0) {
                        star.x = width;
                    }
                    if (star.y > height) {
                        star.y = 0;
                    }
                    if (star.y < 0) {
                        star.y = height;
                    }
                }

                for (i = 0; i < shootingStars.length; i += 1) {
                    var shootingStar = shootingStars[i];
                    if (shootingStar.isSpawning) {
                        shootingStar.opacity += shootingStarOpacityDelta;
                        if (shootingStar.opacity >= 1.0) {
                            shootingStar.isSpawning = false;
                            killShootingStar(shootingStar);
                        }
                    }
                    if (shootingStar.isDying) {
                        shootingStar.opacity -= shootingStarOpacityDelta;
                        if (shootingStar.opacity <= 0.0) {
                            shootingStar.isDying = false;
                            shootingStar.isDead = true;
                        }
                    }
                    shootingStar.trailLengthDelta += trailLengthDelta;

                    shootingStar.update();
                    if (shootingStar.opacity > 0.0) {
                        drawShootingStar(shootingStar);
                    }
                }

                for (i = shootingStars.length - 1; i >= 0; i--) {
                    if (shootingStars[i].isDead) {
                        shootingStars.splice(i, 1);
                    }
                }
            }
            anim = requestAnimationFrame(update);
        }

        function drawStar(star: Star) {
            if (!context) return;

            context.fillStyle = "rgb(255, 255, 255)";
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            context.fill();
        }

        function drawShootingStar(_star: Star) {
            if (!context) return;

            const x = _star.x,
                y = _star.y,
                currentTrailLength = (maxTrailLength * _star.trailLengthDelta),
                pos = lineToAngle(x, y, -currentTrailLength, _star.getHeading());

            context.fillStyle = "rgba(255, 255, 255, " + _star.opacity + ")";
            const starLength = 5;

            context.beginPath();
            context.moveTo(x - 1, y + 1);

            context.lineTo(x, y + starLength);
            context.lineTo(x + 1, y + 1);

            context.lineTo(x + starLength, y);
            context.lineTo(x + 1, y - 1);

            context.lineTo(x, y + 1);
            context.lineTo(x, y - starLength);

            context.lineTo(x - 1, y - 1);
            context.lineTo(x - starLength, y);

            context.lineTo(x - 1, y + 1);
            context.lineTo(x - starLength, y);

            context.closePath();
            context.fill();

            //trail
            context.fillStyle = "rgba(255, 221, 157, " + _star.opacity + ")";
            context.beginPath();
            context.moveTo(x - 1, y - 1);
            context.lineTo(pos.x, pos.y);
            context.lineTo(x + 1, y + 1);
            context.closePath();
            context.fill();
        }

        update();
        const pInterval = setInterval(() => {
            if (paused) return;
            createShootingStar();
        }, shootingStarEmittingInterval);
        const blur = () => paused = true;
        const focus = () => paused = false;
        // @ts-expect-error
        window.pp = paused;

        window.addEventListener("blur", blur);
        window.addEventListener("focus", focus);
        return () => {
            window.removeEventListener("blur", blur);
            window.removeEventListener("focus", focus);
            cancelAnimationFrame(anim);
            clearInterval(pInterval);
        }
    }, []);

    return (
        <canvas 
            style={{
                width: "100%",
                zIndex: -10000,
                position: "fixed",
                top: 0,
                left: 0,
            }}
            ref={canvasRef}
            width={screenWidth}
            height={screenHeight}
        />
    );
}