import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Gauge, Fuel, Users } from "lucide-react";
import type { Vehicle } from "@/types";

interface CarCardProps {
  car: Partial<Vehicle>;
  onSelect?: (carId: string) => void;
}

export function CarCard({ car, onSelect }: CarCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="h-48 bg-gradient-to-tr from-muted/80 to-muted/20 flex items-center justify-center border-b relative">
        <Car className="h-16 w-16 text-muted-foreground/30" />
        {car.category && (
          <Badge className="absolute top-3 right-3" variant="secondary">
            {car.category}
          </Badge>
        )}
      </div>

      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{car.name}</CardTitle>
          {car.rating && (
            <span className="text-sm font-semibold text-primary">
              ★ {car.rating.toFixed(1)}
            </span>
          )}
        </div>
        <CardDescription>{car.brand}</CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-2 pb-4">
        <div className="grid grid-cols-3 gap-2 py-3 border-y text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            <span>{car.transmission ?? "Auto"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            <span>{car.fuelType ?? "Petrol"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{car.seats ?? 5} Seats</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">${car.pricePerDay}</span>
          <span className="text-xs text-muted-foreground"> / day</span>
        </div>
        <Button size="sm" onClick={() => car.id && onSelect?.(car.id)}>
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
