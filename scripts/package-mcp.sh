#!/bin/bash

# Script to package and publish the MCP server as an NPM package

set -e

echo "📦 Packaging @toke/mcp-server..."

# Get the project root (one level up from scripts/)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT/mcp-server"

echo "📥 Installing dependencies..."
npm install

echo "🔍 Type checking..."
npm run typecheck

echo "🏗️  Building package..."
npm run build

echo "✅ Build complete!"
echo ""
echo "Package contents in dist/:"
ls -lh dist/

echo ""
echo "📋 Next steps:"
echo "1. Test the package locally:"
echo "   npm link"
echo "   toke-mcp"
echo ""
echo "2. Publish to npm:"
echo "   cd mcp-server"
echo "   npm publish --access public"
echo ""
echo "3. Or publish with a specific tag:"
echo "   npm publish --access public --tag beta"
