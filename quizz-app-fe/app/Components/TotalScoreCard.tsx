import React from 'react';
import {Card, CardHeader, CardBody} from '@heroui/card';

export interface TotalScoreProps {
    totalScore: number;
}

const TotalScoreCard: React.FC<TotalScoreProps> = ({totalScore}) => {
    return (
        <Card className="max-w-md mx-auto mb-5">
            <CardHeader>
                <h2 className="text-1xl font-bold text-seaBlue text-center">
                    TOTAL USER POINTS
                </h2>
            </CardHeader>
            <CardBody className="flex justify-center items-center">
                <span className="text-4xl text-seaBlue">{totalScore}</span>
            </CardBody>
        </Card>
    );
};

export default TotalScoreCard;