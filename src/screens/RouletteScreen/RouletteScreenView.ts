import Konva from "konva";
import type { View } from "../../types";
import { STAGE_HEIGHT, STAGE_WIDTH, OPTIONS_COLORS, FONT_TITLE, FONT_PRIMARY, COLOR_MINIGAME_TEXT, FONT_SIZE_BUTTON } from "../../constants";
import type { RouletteOption } from "./RouletteScreenModel";
import { Hearts, Timer } from "../../gamestate";

type SelectHandler = (index: number) => void;

// Local interface for counts
interface WheelCounts {
    red: number;
    green: number;
    blue: number;
}

export class RouletteScreenView implements View {
	private group: Konva.Group;
	private wheelGroup: Konva.Group;
    private buttonsGroup: Konva.Group;
	private wheelRadius = 140;
    private options: RouletteOption[];
    private onSelect: SelectHandler;
	private spinAnimation: Konva.Animation | null = null;
	private totalSlotsText: Konva.Text;

	constructor(options: RouletteOption[], counts: WheelCounts, totalSlots: number, onSelect: SelectHandler) {
		this.group = new Konva.Group({ visible: false });
		this.wheelGroup = new Konva.Group();
        this.buttonsGroup = new Konva.Group();
        this.options = options;
        this.onSelect = onSelect;

		this.buildBackground();
		this.buildWheel();
		this.buildInstructionText();
        
		// Create total slots text
		this.totalSlotsText = new Konva.Text({
			x: STAGE_WIDTH * 0.28,
			y: STAGE_HEIGHT * 0.5 + this.wheelRadius + 30,
			text: `Total Slots: ${totalSlots}`,
			fontSize: 20,
			fontFamily: "Georgia, 'Times New Roman', serif",
			fill: "#fef6dc",
			shadowColor: "black",
			shadowBlur: 3,
		});
		this.totalSlotsText.offsetX(this.totalSlotsText.width() / 2);
		this.group.add(this.totalSlotsText);

        this.group.add(this.buttonsGroup);
		this.buildOptionButtons();
		
        this.drawWheel(counts, totalSlots);
		Hearts.draw(this.group);
		Timer.draw(this.group);
	}

	getGroup(): Konva.Group {
		return this.group;
	}

	show(): void {
		this.group.visible(true);
		this.group.getLayer()?.batchDraw();
		this.startWheelSpin();
	}

	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.batchDraw();
		this.stopWheelSpin();
	}

	updateWheel(counts: WheelCounts, totalSlots: number): void {
		this.drawWheel(counts, totalSlots);
		this.totalSlotsText.text(`Total Slots: ${totalSlots}`);
		this.totalSlotsText.offsetX(this.totalSlotsText.width() / 2);
		this.group.getLayer()?.batchDraw();
	}
    
    updateOptions(options: RouletteOption[]): void {
        this.options = options;
        this.buildOptionButtons();
        this.group.getLayer()?.batchDraw();
    }

	private buildBackground(): void {
		const bgImage = new Image();
		bgImage.src = "/bg.png";
		const bg = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			listening: false,
			image: undefined,
		});
		bgImage.onload = () => {
			bg.image(bgImage);
			this.group.getLayer()?.batchDraw();
		};
		this.group.add(bg);

		const scrollImage = new Image();
		scrollImage.src = "/scroll.png";
		const scroll = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			opacity: 0.95,
			listening: false,
			image: undefined,
		});
		scrollImage.onload = () => {
			scroll.image(scrollImage);
			this.group.getLayer()?.batchDraw();
		};
		this.group.add(scroll);
	}

	private buildWheel(): void {
		this.wheelGroup.position({
			x: STAGE_WIDTH * 0.28,
			y: STAGE_HEIGHT * 0.5,
		});

		const outline = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.wheelRadius + 6,
			stroke: "#1b1206",
			strokeWidth: 3,
			shadowColor: "rgba(0,0,0,0.5)",
			shadowBlur: 10,
		});
		this.wheelGroup.add(outline);

		this.group.add(this.wheelGroup);
	}

	private buildInstructionText(): void {
		const heading = new Konva.Text({
			text: "Roulette Strategy",
			fontSize: 36,
			fontFamily: FONT_TITLE,
			fontStyle: "bold",
			fill: COLOR_MINIGAME_TEXT,
			x: STAGE_WIDTH * 0.48,
			y: STAGE_HEIGHT * 0.30,
		});

		const body = new Konva.Text({
			text: "Choose an option to spin.",
			fontSize: 24,
			lineHeight: 1.3,
			fontFamily: FONT_PRIMARY,
			fill: COLOR_MINIGAME_TEXT,
			x: STAGE_WIDTH * 0.48,
			y: STAGE_HEIGHT * 0.37,
		});

		this.group.add(heading);
		this.group.add(body);
	}

	private buildOptionButtons(): void {
        this.buttonsGroup.destroyChildren();
        
        const startX = STAGE_WIDTH * 0.48;
        const startY = STAGE_HEIGHT * 0.50;
        const gap = 15;
        const btnWidth = 180;
        const btnHeight = 100;

        this.options.forEach((opt, index) => {
            const group = new Konva.Group({
                x: startX + index * (btnWidth + gap),
                y: startY
            });
            
            const rect = new Konva.Rect({
                width: btnWidth,
                height: btnHeight,
                fill: OPTIONS_COLORS[index],
                cornerRadius: 10,
                shadowColor: "black",
                shadowBlur: 5,
                shadowOffsetY: 2,
            });
            
            const text = new Konva.Text({
                text: opt.label,
                width: btnWidth,
                height: btnHeight,
                padding: 10,
                align: "center",
                verticalAlign: "middle",
                fontSize: FONT_SIZE_BUTTON,
                fontFamily: FONT_PRIMARY,
                fontStyle: "bold",
                fill: COLOR_MINIGAME_TEXT,
                shadowColor: "black",
                shadowBlur: 2
            });
            
            group.add(rect, text);
            
            group.on("mouseenter", () => {
                this.group.getStage()!.container().style.cursor = "pointer";
                group.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
            });
            group.on("mouseleave", () => {
                this.group.getStage()!.container().style.cursor = "default";
                group.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
            });
            group.on("click tap", () => this.onSelect(index));
            
            this.buttonsGroup.add(group);
        });
	}
    
    private getColorForOption(colorName: string): string {
        const map: Record<string, string> = {
            "Red": "#c62828",
            "Black": "#333333",
            "Blue": "#1565c0",
            "Green": "#2e7d32",
            "Yellow": "#fbc02d",
            "Brown": "#5d4037",
            "Orange": "#ef6c00",
            "REd": "#c62828" 
        };
        return map[colorName] || colorName.toLowerCase();
    }

	private drawWheel(counts: WheelCounts, total: number): void {
		this.wheelGroup
			.getChildren()
			.slice(1)
			.forEach((child) => child.destroy());

		if (total === 0) {
			this.group.getLayer()?.batchDraw();
			return;
		}

        const countsArr = [counts.red, counts.green, counts.blue];
        
		const singleAngle = 360 / total;
		let rotation = -90; 
        
        countsArr.forEach((count, i) => {
             for(let j=0; j<count; j++) {
                const wedge = new Konva.Wedge({
                    x: 0,
                    y: 0,
                    radius: this.wheelRadius,
                    angle: singleAngle,
                    rotation,
                    fill: OPTIONS_COLORS[i],
                    stroke: "#1b1206",
                    strokeWidth: 2,
                });
                this.wheelGroup.add(wedge);
                rotation += singleAngle;
             }
        });

		const hub = new Konva.Circle({
			x: 0,
			y: 0,
			radius: 10,
			fill: "#1b1206",
		});
		this.wheelGroup.add(hub);

		this.group.getLayer()?.batchDraw();
	}

	private startWheelSpin(): void {
		if (this.spinAnimation) {
			this.spinAnimation.stop();
		}

		const layer = this.group.getLayer();
		if (!layer) return;

		this.spinAnimation = new Konva.Animation((frame) => {
			if (!frame) return;
			const rotationSpeed = 30; // degrees per second
			const angleDelta = (rotationSpeed * frame.timeDiff) / 1000;
			this.wheelGroup.rotate(angleDelta);
		}, layer);

		this.spinAnimation.start();
	}

	private stopWheelSpin(): void {
		if (this.spinAnimation) {
			this.spinAnimation.stop();
			this.spinAnimation = null;
		}
	}
}
