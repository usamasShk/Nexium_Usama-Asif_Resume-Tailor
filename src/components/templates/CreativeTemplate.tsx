import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: '40 60',
    backgroundColor: '#ffffff', // Set to white
    fontFamily: 'Helvetica',
    margin: 0,
  },
  header: {
    marginBottom: 20,
  },
  mainContent: {
    padding: '0 20',
  },
  section: {
    marginBottom: 28,
  },
  name: {
    fontSize: 28, // Slightly larger
    fontWeight: 'bold',
    color: '#000000', // Black
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#000000', // Black
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000', // Black
    marginBottom: 8,
    textTransform: 'uppercase',
    borderLeft: '4px solid #8b5cf6', // Purple left border accent
    paddingLeft: 8,
    fontFamily: 'Helvetica', // Supported by @react-pdf/renderer
  },
  content: {
    fontSize: 10,
    color: '#000000', // Black
    lineHeight: 1.6,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: '#000000', // Black
  },
  bulletContent: {
    flex: 1,
    fontSize: 10,
    color: '#000000', // Black
  },
  link: {
    color: '#000000', // Black
    textDecoration: 'underline',
  }
});

interface ResumeProps {
  formattedText: string;
}

export default function CreativeTemplate({ formattedText }: ResumeProps) {
  // Split the text into sections
  const sections = formattedText.split('\n\n').filter(Boolean).map(section => {
    const lines = section.split('\n').filter(line => line.trim());
    const title = lines[0];
    const content = lines.slice(1);
    return { title, content };
  });

  const formatLine = (line: string) => {
    if (!line.trim()) return null;

    // Handle bullet points
    if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
      return (
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletContent}>{line.trim().replace(/^[-•]\s*/, '')}</Text>
        </View>
      );
    }

    // Handle links
    if (line.includes('http')) {
      const [label, url] = line.split(': ');
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text>{label}: </Text>
          <Link src={url?.trim()} style={styles.link}>{url?.trim()}</Link>
        </View>
      );
    }

    // Regular text
    return <Text>{line.trim()}</Text>;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Main content */}
        <View style={styles.mainContent}>
          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              {/* Section Title */}
              <Text style={styles.sectionTitle}>{section.title}</Text>

              {/* Section Content */}
              <View style={styles.content}>
                {section.content.map((line, lineIndex) => (
                  <View key={lineIndex}>
                    {formatLine(line)}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 