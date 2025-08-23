"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  granularity: string;
  onDateRangeChange: (startDate: string, endDate: string, granularity: string) => void;
}

const PRESET_RANGES = [
  {
    label: "Last 7 days",
    getValue: () => ({
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      granularity: "daily"
    })
  },
  {
    label: "Last 30 days",
    getValue: () => ({
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      granularity: "daily"
    })
  },
  {
    label: "Last 90 days",
    getValue: () => ({
      start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      granularity: "daily"
    })
  },
  {
    label: "Last 24 hours",
    getValue: () => ({
      start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString(),
      granularity: "hourly"
    })
  }
];

export default function DateRangePicker({
  startDate,
  endDate,
  granularity,
  onDateRangeChange
}: DateRangePickerProps) {
  const [localStartDate, setLocalStartDate] = useState(startDate.split('T')[0]);
  const [localEndDate, setLocalEndDate] = useState(endDate.split('T')[0]);
  const [localGranularity, setLocalGranularity] = useState(granularity);

  const handleApply = () => {
    onDateRangeChange(
      localStartDate + 'T00:00:00.000Z',
      localEndDate + 'T23:59:59.999Z',
      localGranularity
    );
  };

  const handlePresetSelect = (preset: typeof PRESET_RANGES[0]) => {
    const { start, end, granularity: presetGranularity } = preset.getValue();
    setLocalStartDate(start.split('T')[0]);
    setLocalEndDate(end.split('T')[0]);
    setLocalGranularity(presetGranularity);
    onDateRangeChange(start, end, presetGranularity);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <h3 className="text-sm font-medium">Date Range</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="granularity">Granularity</Label>
              <Select value={localGranularity} onValueChange={setLocalGranularity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleApply} className="w-full">
                Apply
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {PRESET_RANGES.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => handlePresetSelect(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
