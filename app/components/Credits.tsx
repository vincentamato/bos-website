import { PortableText } from '@/sanity'
import { PortableTextBlock } from '@portabletext/types'
import StructuredCredits from './StructuredCredits'

interface CreditsProps {
  credits: PortableTextBlock[] | any
}

export default function Credits({ credits }: CreditsProps) {
  // If credits is in Portable Text format (array of blocks), use PortableText
  if (Array.isArray(credits) && credits.some(block => block._type === 'block')) {
    return <PortableText value={credits} />;
  }

  // For string credits, try to parse as structured format or render as plain text
  if (typeof credits === 'string') {
    try {
      // Try to parse the string as JSON
      try {
        const parsedCredits = JSON.parse(credits);
        if (typeof parsedCredits === 'object') {
          return renderStructuredCredits(parsedCredits);
        }
      } catch (e) {
        // Not valid JSON, continue with text parsing
      }

      // Parse plain text credits in format like "Role: Name1, Name2"
      const lines = credits.split('\n').filter(line => line.trim() !== '');
      const creditGroups: { role: string; names: string[] }[] = [];
      
      for (const line of lines) {
        // Check if the line defines a role
        if (line.includes(':')) {
          const [role, namesStr] = line.split(':');
          const names = namesStr ? namesStr.split(',').map(name => name.trim()).filter(Boolean) : [];
          creditGroups.push({ role: role.trim(), names });
        }
      }
      
      if (creditGroups.length > 0) {
        return <StructuredCredits creditGroups={creditGroups} />;
      }
      
      // If we couldn't parse it as structured data, just render as preformatted text
      return <pre className="text-gray-300 whitespace-pre-line text-[18px]">{credits}</pre>;
    } catch (error) {
      return <pre className="text-gray-300 whitespace-pre-line text-[18px]">{credits}</pre>;
    }
  }

  // If it's an object, render structured credits
  if (typeof credits === 'object' && credits !== null && !Array.isArray(credits)) {
    return renderStructuredCredits(credits);
  }

  // Fallback
  return <div className="text-gray-300 text-[18px]">Credits information unavailable</div>;
}

// Helper function to render structured credits
function renderStructuredCredits(creditsObject: any) {
  try {
    const creditGroups = Object.entries(creditsObject).map(([role, names]) => ({
      role,
      names: Array.isArray(names) ? names : [String(names)]
    }));
    
    return <StructuredCredits creditGroups={creditGroups} />;
  } catch (error) {
    return <div className="text-gray-300 text-[18px]">Unable to display credits information</div>;
  }
} 