import React, {FC, useEffect, useRef} from "react";
import {CanvasData} from "../../models/CanvasData";

interface HeatMapProps {
    data: CanvasData[],
    radius: number
}

export const HeatMap: FC<HeatMapProps> = ({data, radius}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvas();
    }, [data]);

    const drawPoint = (ctx: any, radius: number, x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x - radius, y - radius, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    const canvas = () => {
        const brushCanvas = canvasRef.current
        // @ts-ignore
        var ctx = brushCanvas.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.shadowBlur = radius;
        ctx.shadowColor = 'black';
        let maxValue = 0;

        if (data.length >= 1) {
            maxValue = data[0].total;
        }

        data.map((item) => {
            ctx.globalAlpha = item.total / maxValue;
            drawPoint(ctx, radius, item.position_x, item.position_y);
        })
    }

    return (
        <div>
            <canvas ref={canvasRef} width={1000} height={1000}/>
        </div>
    );
}
