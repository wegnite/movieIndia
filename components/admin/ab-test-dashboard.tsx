"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Play,
  Pause,
  Square,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ExperimentResult {
  experiment: {
    id: number;
    name: string;
    description: string;
    status: "draft" | "running" | "paused" | "completed";
    start_date: string;
    end_date?: string;
    traffic_percentage: number;
  };
  results: Array<{
    variant_id: number;
    variant_name: string;
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
    conversion_rate: number;
    click_through_rate: number;
    avg_order_value: number;
    variant: {
      id: number;
      name: string;
      description: string;
      is_control: boolean;
      config: string;
    };
    statistical_significance: {
      confidence: number;
      significant: boolean;
      p_value: number;
    };
  }>;
  total_assignments: number;
  summary: {
    total_views: number;
    total_conversions: number;
    total_revenue: number;
    avg_conversion_rate: number;
  };
}

export default function ABTestDashboard() {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchExperiments();
  }, []);

  const fetchExperiments = async () => {
    try {
      const response = await fetch("/api/ab-test/experiments");
      const data = await response.json();
      
      if (data.code === 0) {
        setExperiments(data.data.experiments || []);
      } else {
        toast.error("Failed to fetch experiments");
      }
    } catch (error) {
      console.error("Fetch experiments error:", error);
      toast.error("Failed to fetch experiments");
    } finally {
      setLoading(false);
    }
  };

  const fetchExperimentResults = async (experimentId: number) => {
    try {
      const response = await fetch(`/api/ab-test/experiments?id=${experimentId}`);
      const data = await response.json();
      
      if (data.code === 0) {
        setSelectedExperiment(data.data);
      } else {
        toast.error("Failed to fetch experiment results");
      }
    } catch (error) {
      console.error("Fetch experiment results error:", error);
      toast.error("Failed to fetch experiment results");
    }
  };

  const updateExperimentStatus = async (experimentId: number, action: string) => {
    setActionLoading(experimentId);
    try {
      const response = await fetch("/api/ab-test/experiments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experiment_id: experimentId,
          action,
        }),
      });

      const data = await response.json();
      
      if (data.code === 0) {
        toast.success(`Experiment ${action}ed successfully`);
        await fetchExperiments();
        if (selectedExperiment?.experiment.id === experimentId) {
          await fetchExperimentResults(experimentId);
        }
      } else {
        toast.error(data.message || "Failed to update experiment");
      }
    } catch (error) {
      console.error("Update experiment error:", error);
      toast.error("Failed to update experiment");
    } finally {
      setActionLoading(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600";
    if (confidence >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Experiments</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {experiments.filter((e) => e.status === "running").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {experiments.length} total experiments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedExperiment?.total_assignments || 0}
            </div>
            <p className="text-xs text-muted-foreground">Current experiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedExperiment ? formatCurrency(selectedExperiment.summary.total_revenue) : "₹0"}
            </div>
            <p className="text-xs text-muted-foreground">Current experiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedExperiment ? `${selectedExperiment.summary.avg_conversion_rate.toFixed(2)}%` : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">Current experiment</p>
          </CardContent>
        </Card>
      </div>

      {/* Experiment Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Experiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select
              value={selectedExperiment?.experiment.id.toString() || ""}
              onValueChange={(value) => fetchExperimentResults(parseInt(value))}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select an experiment" />
              </SelectTrigger>
              <SelectContent>
                {experiments.map((exp) => (
                  <SelectItem key={exp.id} value={exp.id.toString()}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(exp.status)}`}></div>
                      <span>{exp.name}</span>
                      <Badge variant="outline">{exp.status}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedExperiment && (
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateExperimentStatus(
                      selectedExperiment.experiment.id,
                      selectedExperiment.experiment.status === "running" ? "pause" : "start"
                    )
                  }
                  disabled={actionLoading === selectedExperiment.experiment.id}
                >
                  {selectedExperiment.experiment.status === "running" ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" /> Start
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    updateExperimentStatus(selectedExperiment.experiment.id, "stop")
                  }
                  disabled={
                    actionLoading === selectedExperiment.experiment.id ||
                    selectedExperiment.experiment.status === "completed"
                  }
                >
                  <Square className="w-4 h-4 mr-1" /> Stop
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedExperiment && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="variants">Variant Details</TabsTrigger>
            <TabsTrigger value="charts">Performance Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Experiment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{selectedExperiment.experiment.name}</span>
                  <Badge className={getStatusColor(selectedExperiment.experiment.status)}>
                    {selectedExperiment.experiment.status}
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">
                  {selectedExperiment.experiment.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span>Traffic Percentage:</span>
                    <span>{selectedExperiment.experiment.traffic_percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Assignments:</span>
                    <span>{selectedExperiment.total_assignments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span>
                      {new Date(selectedExperiment.experiment.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedExperiment.experiment.end_date && (
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span>
                        {new Date(selectedExperiment.experiment.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {selectedExperiment.summary.total_views.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {selectedExperiment.summary.total_conversions.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(selectedExperiment.summary.total_revenue)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {selectedExperiment.summary.avg_conversion_rate.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Variant Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>CVR</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>AOV</TableHead>
                      <TableHead>Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedExperiment.results.map((result) => (
                      <TableRow key={result.variant_id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{result.variant_name}</span>
                            {result.variant.is_control && (
                              <Badge variant="outline">Control</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{result.views.toLocaleString()}</TableCell>
                        <TableCell>{result.clicks.toLocaleString()}</TableCell>
                        <TableCell>{result.conversions.toLocaleString()}</TableCell>
                        <TableCell>{formatCurrency(result.revenue)}</TableCell>
                        <TableCell>{result.conversion_rate.toFixed(2)}%</TableCell>
                        <TableCell>{result.click_through_rate.toFixed(2)}%</TableCell>
                        <TableCell>{formatCurrency(result.avg_order_value)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span
                              className={getConfidenceColor(result.statistical_significance.confidence)}
                            >
                              {result.statistical_significance.confidence.toFixed(1)}%
                            </span>
                            {result.statistical_significance.significant ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate by Variant</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={selectedExperiment.results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="variant_name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`${value.toFixed(2)}%`, 'Conversion Rate']}
                      />
                      <Bar dataKey="conversion_rate" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Variant</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={selectedExperiment.results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="variant_name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}