# Chart Types Documentation

This document provides a comprehensive overview of all available chart types in the SmartProposal dashboard system.

## Available Chart Types

### 1. Line Chart (FallbackLineChart)
**Purpose**: Display trends over time with interactive hover effects
**Best For**: Time-series data, user activity tracking, performance metrics
**Features**:
- Interactive hover tooltips
- Average line indicator
- Min/max value highlighting
- Smooth animations
- Responsive design

**Usage**:
```jsx
const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        label: "User Activity",
        data: [12, 19, 15, 25, 22, 30],
        borderColor: "#4318FF",
        tension: 0.4
    }]
};

<FallbackLineChart chartData={chartData} />
```

### 2. Horizontal Bar Chart (FallbackHorizontalBarChart)
**Purpose**: Compare different categories with horizontal bars
**Best For**: Status comparisons, category rankings, progress tracking
**Features**:
- Color-coded categories
- Percentage calculations
- Hover interactions
- Summary statistics
- Progress bar animations

**Usage**:
```jsx
const chartData = {
    labels: ["Approved", "Rejected", "Pending", "Under Review"],
    datasets: [{
        data: [15, 8, 12, 5],
        backgroundColor: ["#05CD99", "#EE5D50", "#FFB547", "#4318FF"]
    }]
};

<FallbackHorizontalBarChart chartData={chartData} />
```

### 3. Donut Chart (FallbackDonutChart)
**Purpose**: Show proportional data with a modern donut design
**Best For**: Composition analysis, percentage breakdowns, part-to-whole relationships
**Features**:
- Interactive segments
- Center total display
- Hover animations
- Legend with percentages
- SVG-based rendering

**Usage**:
```jsx
const chartData = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [{
        data: [30, 20, 15],
        backgroundColor: ["#10B981", "#EF4444", "#F59E0B"]
    }]
};

<FallbackDonutChart chartData={chartData} />
```

### 4. Radial Progress Chart (FallbackRadialChart)
**Purpose**: Multiple progress indicators in a radial layout
**Best For**: Multi-metric dashboards, progress comparison, KPI visualization
**Features**:
- Concentric circles for multiple metrics
- Interactive hover effects
- Compact legend
- Animated progress
- Color-coded categories

**Usage**:
```jsx
const chartData = {
    labels: ["Metric 1", "Metric 2", "Metric 3"],
    datasets: [{
        data: [75, 60, 85]
    }]
};

<FallbackRadialChart chartData={chartData} />
```

### 5. Area Chart (FallbackAreaChart)
**Purpose**: Show trends with filled areas for cumulative visualization
**Best For**: Volume over time, filled trend analysis, comparative trends
**Features**:
- Gradient fills
- Grid overlay
- Interactive data points
- Smooth curves
- Tooltip with details

**Usage**:
```jsx
const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        label: "Revenue",
        data: [1000, 1200, 1100, 1400, 1300, 1600],
        borderColor: "#10B981",
        fill: true
    }]
};

<FallbackAreaChart chartData={chartData} />
```

### 6. Gauge Chart (FallbackGaugeChart)
**Purpose**: Single metric visualization with target indicators
**Best For**: KPIs, performance metrics, progress toward goals
**Features**:
- Arc-based progress
- Needle indicator
- Percentage calculation
- Color coding
- Target comparison

**Usage**:
```jsx
<FallbackGaugeChart 
    value={75} 
    maxValue={100} 
    title="System Health" 
    color="#10B981" 
/>
```

### 7. Stacked Bar Chart (FallbackStackedBarChart)
**Purpose**: Compare multiple data series across categories
**Best For**: Multi-dimensional comparisons, budget breakdowns, resource allocation
**Features**:
- Stacked segments
- Category comparison
- Hover details
- Proportional visualization
- Multi-series support

**Usage**:
```jsx
const chartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
        {
            label: "Sales",
            data: [20, 25, 30, 28]
        },
        {
            label: "Marketing", 
            data: [15, 18, 22, 20]
        }
    ]
};

<FallbackStackedBarChart chartData={chartData} />
```

## Chart Selection Guide

### Choose Line Chart When:
- ✅ Showing trends over time
- ✅ Data has temporal dimension
- ✅ Need to highlight peaks/valleys
- ✅ Comparing multiple time series

### Choose Horizontal Bar Chart When:
- ✅ Comparing categories
- ✅ Category names are long
- ✅ Need to show rankings
- ✅ Space is limited vertically

### Choose Donut Chart When:
- ✅ Showing parts of a whole
- ✅ Limited number of categories (2-8)
- ✅ Want modern, clean appearance
- ✅ Need to emphasize total value

### Choose Radial Chart When:
- ✅ Multiple progress metrics
- ✅ Compact space requirements
- ✅ Need to show completion rates
- ✅ Want innovative visualization

### Choose Area Chart When:
- ✅ Showing cumulative data
- ✅ Emphasizing volume/magnitude
- ✅ Comparing filled trends
- ✅ Data has continuous flow

### Choose Gauge Chart When:
- ✅ Single important metric
- ✅ Progress toward goal
- ✅ KPI dashboard
- ✅ Need immediate visual impact

### Choose Stacked Bar Chart When:
- ✅ Multiple data series
- ✅ Comparing compositions
- ✅ Need category breakdown
- ✅ Showing resource allocation

## Implementation Tips

### 1. Data Preparation
```jsx
// Always ensure data is properly formatted
const formatChartData = (rawData) => ({
    labels: rawData.map(item => item.label),
    datasets: [{
        data: rawData.map(item => item.value),
        backgroundColor: rawData.map(item => item.color)
    }]
});
```

### 2. Error Handling
```jsx
// Include fallback data for empty states
const chartData = apiData?.length > 0 ? formatChartData(apiData) : {
    labels: ["No Data"],
    datasets: [{ data: [1], backgroundColor: ["#E5E7EB"] }]
};
```

### 3. Responsive Design
All charts are built with responsive design in mind:
- Mobile-first approach
- Flexible containers
- Scalable text and elements
- Touch-friendly interactions

### 4. Performance Optimization
- Charts use CSS animations instead of JavaScript
- Minimal re-renders with React.memo
- Efficient event handling
- Lazy loading for large datasets

### 5. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- High contrast colors
- Screen reader compatibility

## Customization Options

### Colors
```jsx
const customColors = {
    primary: "#4318FF",
    success: "#05CD99", 
    warning: "#FFB547",
    danger: "#EE5D50",
    info: "#01B574"
};
```

### Animations
```jsx
const animationConfig = {
    duration: 1000,
    easing: "ease-out",
    delay: 300
};
```

### Themes
Charts automatically adapt to light/dark themes using:
- `dark:` Tailwind prefixes
- CSS custom properties
- Dynamic color calculation

## Best Practices

1. **Keep it Simple**: Don't overload charts with too much data
2. **Use Appropriate Colors**: Follow color theory and accessibility guidelines
3. **Provide Context**: Always include titles, labels, and legends
4. **Test Responsiveness**: Ensure charts work on all device sizes
5. **Handle Empty States**: Always provide fallback content
6. **Performance**: Use appropriate chart types for data size
7. **User Experience**: Include helpful tooltips and interactions

## Troubleshooting

### Common Issues:
1. **Chart not rendering**: Check data format and required properties
2. **Animation not working**: Ensure proper state management
3. **Responsive issues**: Verify container sizing and CSS
4. **Performance problems**: Consider data pagination or chart type change

### Debug Mode:
Enable debug logging to troubleshoot issues:
```jsx
console.log('Chart Data:', chartData);
console.log('Chart Props:', props);
```

## Future Enhancements

Planned chart types for future releases:
- Scatter Plot Charts
- Heatmap Visualizations  
- Treemap Charts
- Sankey Diagrams
- Bubble Charts
- Candlestick Charts
- Radar/Spider Charts

## Support

For questions or issues with chart implementations:
1. Check this documentation first
2. Review the component source code
3. Test with sample data
4. Check browser console for errors
5. Verify data format matches expected structure
