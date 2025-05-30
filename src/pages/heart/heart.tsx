import React, { useEffect, useRef } from 'react';

interface ParticleSettings {
    length: number;
    duration: number;
    velocity: number;
    effect: number;
    size: number;
}

interface Settings {
    particles: ParticleSettings;
}

class Point {
    x: number;
    y: number;

    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    length(length?: number): Point | number {
        if (typeof length === 'undefined') {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
    }

    normalize(): Point {
        const len = this.length() as number;
        this.x /= len;
        this.y /= len;
        return this;
    }
}

class Particle {
    position: Point;
    velocity: Point;
    acceleration: Point;
    age: number;

    constructor() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
    }

    initialize(x: number, y: number, dx: number, dy: number): void {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
    }

    update(deltaTime: number): void {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
    }

    draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
        const ease = (t: number) => (--t) * t * t + 1;
        const size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(
            image,
            this.position.x - size / 2,
            this.position.y - size / 2,
            size,
            size
        );
    }
}

class ParticlePool {
    private particles: Particle[];
    private firstActive: number;
    private firstFree: number;
    private duration: number;

    constructor(length: number) {
        this.particles = new Array(length);
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i] = new Particle();
        }
        this.firstActive = 0;
        this.firstFree = 0;
        this.duration = settings.particles.duration;
    }

    add(x: number, y: number, dx: number, dy: number): void {
        this.particles[this.firstFree].initialize(x, y, dx, dy);

        // handle circular queue
        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
    }

    update(deltaTime: number): void {
        // update active particles
        if (this.firstActive < this.firstFree) {
            for (let i = this.firstActive; i < this.firstFree; i++) {
                this.particles[i].update(deltaTime);
            }
        }
        if (this.firstFree < this.firstActive) {
            for (let i = this.firstActive; i < this.particles.length; i++) {
                this.particles[i].update(deltaTime);
            }
            for (let i = 0; i < this.firstFree; i++) {
                this.particles[i].update(deltaTime);
            }
        }

        // remove inactive particles
        while (
            this.particles[this.firstActive].age >= this.duration &&
            this.firstActive !== this.firstFree
            ) {
            this.firstActive++;
            if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
    }

    draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
        // draw active particles
        if (this.firstActive < this.firstFree) {
            for (let i = this.firstActive; i < this.firstFree; i++) {
                this.particles[i].draw(context, image);
            }
        }
        if (this.firstFree < this.firstActive) {
            for (let i = this.firstActive; i < this.particles.length; i++) {
                this.particles[i].draw(context, image);
            }
            for (let i = 0; i < this.firstFree; i++) {
                this.particles[i].draw(context, image);
            }
        }
    }
}

const settings: Settings = {
    particles: {
        length: 500,
        duration: 2,
        velocity: 100,
        effect: -0.75,
        size: 30,
    },
};

const Heart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const particles = new ParticlePool(settings.particles.length);
        const particleRate = settings.particles.length / settings.particles.duration;
        let time: number;

        const pointOnHeart = (t: number): Point => {
            return new Point(
                160 * Math.pow(Math.sin(t), 3),
                130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
            );
        };

        const createParticleImage = (): HTMLImageElement => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Could not get canvas context');

            canvas.width = settings.particles.size;
            canvas.height = settings.particles.size;

            const to = (t: number): Point => {
                const point = pointOnHeart(t);
                point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
                point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
                return point;
            };

            context.beginPath();
            let t = -Math.PI;
            let point = to(t);
            context.moveTo(point.x, point.y);
            while (t < Math.PI) {
                t += 0.01;
                point = to(t);
                context.lineTo(point.x, point.y);
            }
            context.closePath();

            context.fillStyle = '#ea80b0';
            context.fill();

            const image = new Image();
            image.src = canvas.toDataURL();
            return image;
        };

        const image = createParticleImage();

        const render = () => {
            requestAnimationFrame(render);

            const newTime = new Date().getTime() / 1000;
            const deltaTime = newTime - (time || newTime);
            time = newTime;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const amount = particleRate * deltaTime;
            for (let i = 0; i < amount; i++) {
                const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
                const dir = pos.clone().length(settings.particles.velocity) as Point;
                particles.add(
                    canvas.width / 2 + pos.x,
                    canvas.height / 2 - pos.y,
                    dir.x,
                    -dir.y
                );
            }

            particles.update(deltaTime);
            particles.draw(context, image);

            context.fillStyle = "#FF1493";
            context.font = "40px Arial";
            context.fillText("", canvas.width / 2 - 105, canvas.height / 2 - 250);
            context.fillText(" ", canvas.width / 2 - 200, canvas.height / 2 + 250);
            context.font = "30px Arial";
            context.fillText("满足你的小愿望吧", canvas.width / 2 - 110, canvas.height / 2 + 300);
        };

        const onResize = () => {
            if (!canvas) return;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };

        window.addEventListener('resize', onResize);

        const initTimeout = setTimeout(() => {
            onResize();
            render();
        }, 10);

        return () => {
            clearTimeout(initTimeout);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'black' }}>
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default Heart;