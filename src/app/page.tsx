import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          マーケティング診断 - Will から逆算
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          既存の適性診断ではなく、あなたの目標から逆算して
          「今何が足りないか」を特定するキャリアビジョン診断。
        </p>
        <a href="/diagnosis">
          <Button size="lg">無料で診断を始める</Button>
        </a>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-medium text-gray-800 mb-2">ゴールから逆算</h3>
          <p className="text-sm text-gray-500">
            「何が向いているか」ではなく「どうなりたいか」から、
            必要なスキルと行動を導き出します。
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl mb-3">🧩</div>
          <h3 className="font-medium text-gray-800 mb-2">ミッシングピース特定</h3>
          <p className="text-sm text-gray-500">
            7つのスキル軸で現状と目標のギャップを可視化。
            優先度付きのアクションプランを提示します。
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="font-medium text-gray-800 mb-2">ロードマップ生成</h3>
          <p className="text-sm text-gray-500">
            年齢・経験・学習投資量を加味した、
            リアルなキャリアロードマップを自動生成します。
          </p>
        </div>
      </section>

      <section className="bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          7つのスキル軸で診断
        </h2>
        <p className="text-gray-600 mb-6">
          経済産業省ITスキル標準をベースにした独自フレームワーク
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
          {[
            '戦略立案',
            'デジタルマーケティング',
            'オフラインマーケティング',
            'テクノロジー',
            'マネジメント',
            'データ分析',
            'コミュニケーション',
          ].map((skill) => (
            <div key={skill} className="bg-white rounded-lg py-2 px-3 text-sm text-gray-700 border border-gray-200">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
