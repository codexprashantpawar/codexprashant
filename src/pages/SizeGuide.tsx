import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sizes = {
  tops: [
    { size: "XS", bust: "32", waist: "24", hip: "34" },
    { size: "S", bust: "34", waist: "26", hip: "36" },
    { size: "M", bust: "36", waist: "28", hip: "38" },
    { size: "L", bust: "38", waist: "30", hip: "40" },
    { size: "XL", bust: "40", waist: "32", hip: "42" },
    { size: "XXL", bust: "42", waist: "34", hip: "44" },
  ],
  bottoms: [
    { size: "26", waist: "26", hip: "36" },
    { size: "28", waist: "28", hip: "38" },
    { size: "30", waist: "30", hip: "40" },
    { size: "32", waist: "32", hip: "42" },
    { size: "34", waist: "34", hip: "44" },
  ]
};

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Size Guide</h1>
            <p className="text-muted-foreground text-center mb-12">All measurements are in inches</p>

            <section className="mb-12">
              <h2 className="font-serif text-2xl mb-6">Tops, Kurtis & Dresses</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-card rounded-lg overflow-hidden">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-4 text-left">Size</th>
                      <th className="px-6 py-4 text-left">Bust</th>
                      <th className="px-6 py-4 text-left">Waist</th>
                      <th className="px-6 py-4 text-left">Hip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.tops.map(row => (
                      <tr key={row.size} className="border-t border-border">
                        <td className="px-6 py-4 font-medium">{row.size}</td>
                        <td className="px-6 py-4">{row.bust}"</td>
                        <td className="px-6 py-4">{row.waist}"</td>
                        <td className="px-6 py-4">{row.hip}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl mb-6">Jeans & Pants</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-card rounded-lg overflow-hidden">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-4 text-left">Size</th>
                      <th className="px-6 py-4 text-left">Waist</th>
                      <th className="px-6 py-4 text-left">Hip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.bottoms.map(row => (
                      <tr key={row.size} className="border-t border-border">
                        <td className="px-6 py-4 font-medium">{row.size}</td>
                        <td className="px-6 py-4">{row.waist}"</td>
                        <td className="px-6 py-4">{row.hip}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-4">How to Measure</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Bust:</strong> Measure around the fullest part of your bust</li>
                <li><strong>Waist:</strong> Measure around the narrowest part of your waist</li>
                <li><strong>Hip:</strong> Measure around the fullest part of your hips</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
