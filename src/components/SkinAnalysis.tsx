import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import DatasetProductCard from './DatasetProductCard';

interface SkinIssue {
  type: string;
  severity: string;
  areas: string[];
  confidence: number;
}

interface AnalysisResults {
  confidence: number;
  issues: SkinIssue[];
  skinType: string;
  overallHealth: string;
}

interface SkinAnalysisProps {
  results: AnalysisResults;
  image: string | null;
}

const SkinAnalysis: React.FC<SkinAnalysisProps> = ({ results, image }) => {
  const [products, setProducts] = useState<any[]>([]);

  function mapIssueToProblem(): string | null {
    if (!results.issues.length) return null;
    const t = results.issues[0].type.toLowerCase();

    if (t.includes("acne") || t.includes("pimple")) return "acne";
    if (t.includes("dry")) return "dryness";
    if (t.includes("spot") || t.includes("pigment")) return "darkspots";
    if (t.includes("wrinkle") || t.includes("aging")) return "wrinkles";

    return "acne";
  }

  // ✅ FIXED — use Render backend instead of localhost
  async function loadRecommendations(problem: string) {
    try {
      const res = await fetch(
        "https://smart-skin-feedback-loop.onrender.com/api/recommend?problem=" + problem
      );

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Recommendation fetch failed:", err);
      setProducts([]);
    }
  }

  useEffect(() => {
    const problem = mapIssueToProblem();
    if (problem) loadRecommendations(problem);
  }, [results]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'mild': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'light': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe': return <AlertCircle className="h-4 w-4" />;
      case 'moderate': return <Info className="h-4 w-4" />;
      case 'mild': return <Target className="h-4 w-4" />;
      case 'light': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getHealthScore = () => {
    const severityScores = { severe: 0, moderate: 25, mild: 50, light: 75 };
    if (results.issues.length === 0) return 90;

    const avgScore = results.issues.reduce((sum, issue) => {
      return sum + (severityScores[issue.severity.toLowerCase() as keyof typeof severityScores] || 50);
    }, 0) / results.issues.length;

    return Math.max(30, avgScore);
  };

  const healthScore = getHealthScore();

  return (
    <div className="space-y-6">

      {/* Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">Analysis Overview</span>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{Math.round(healthScore)}%</div>
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Skin Type</span>
            <span>{results.skinType}</span>
          </div>
          <div className="flex justify-between">
            <span>Overall Health</span>
            <span>{results.overallHealth}</span>
          </div>
          <Progress value={healthScore} />
        </CardContent>
      </Card>

      {/* Recommended Products */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Products</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            {products.map(p => (
              <DatasetProductCard
                key={p.product_id}
                product={p}
              />
            ))}
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default SkinAnalysis;