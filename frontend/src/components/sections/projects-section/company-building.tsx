import styles from './company-building.module.css'

/**
 * Prédio de pixel art pra representar cada empresa na jornada — estilo
 * arquitetônico clássico com frontão, cornijas entre andares, pilastras
 * nas bordas, janelas emolduradas com floreiras, e porta de topo
 * arredondado. Antena com luz forte piscando no topo.
 * Desenhado num viewBox -10 70 113 (a antena sai acima do y=0,
 * e a altura é cortada rente à calçada em y=103, sem margem sobrando).
 */
export function CompanyBuilding() {
  return (
    <svg
      className={styles.building}
      viewBox="0 -10 70 113"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Antena com luz forte piscando, saindo do topo do frontão */}
      <rect x="34" y="-6" width="2" height="6" fill="#4d7200" />
      <rect className={styles.antennaLight} x="33" y="-8" width="4" height="2" fill="#aaff00" />

      {/* Frontão (telhadinho triangular decorativo no topo) */}
      <rect x="30" y="0" width="10" height="2" fill="#88cc00" />
      <rect x="28" y="2" width="14" height="2" fill="#66aa00" />
      <rect x="26" y="4" width="18" height="2" fill="#4d7200" />

      {/* Cornija larga sob o frontão */}
      <rect x="4" y="6" width="62" height="3" fill="#88cc00" />
      <rect x="2" y="9" width="66" height="2" fill="#66aa00" />

      {/* Corpo — parede lisa */}
      <rect x="6" y="11" width="58" height="90" fill="#4d7200" />

      {/* Pilastras largas nas bordas */}
      <rect x="6" y="11" width="6" height="90" fill="#66aa00" />
      <rect x="58" y="11" width="6" height="90" fill="#66aa00" />

      {/* ===== ANDAR 1 ===== */}
      <rect x="17" y="16" width="10" height="14" fill="#66aa00" />
      <rect x="18" y="17" width="8" height="12" className={styles.flickerA} fill="#aaff00" />

      <rect x="30" y="16" width="10" height="14" fill="#66aa00" />
      <rect x="31" y="17" width="8" height="12" fill="#3b6d11" />

      <rect x="43" y="16" width="10" height="14" fill="#66aa00" />
      <rect x="44" y="17" width="8" height="12" className={styles.flickerB} fill="#aaff00" />

      {/* Floreiras do andar 1 */}
      <rect x="17" y="30" width="10" height="3" fill="#4d7200" />
      <rect x="18" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="21" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="24" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="18" y="27" width="2" height="1" fill="#ff6b9d" />
      <rect x="21" y="27" width="2" height="1" fill="#ffe14d" />
      <rect x="24" y="27" width="2" height="1" fill="#ff6b9d" />

      <rect x="30" y="30" width="10" height="3" fill="#4d7200" />
      <rect x="31" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="34" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="37" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="31" y="27" width="2" height="1" fill="#ffe14d" />
      <rect x="34" y="27" width="2" height="1" fill="#ff6b9d" />
      <rect x="37" y="27" width="2" height="1" fill="#ffe14d" />

      <rect x="43" y="30" width="10" height="3" fill="#4d7200" />
      <rect x="44" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="47" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="50" y="28" width="2" height="2" fill="#3b6d11" />
      <rect x="44" y="27" width="2" height="1" fill="#ff6b9d" />
      <rect x="47" y="27" width="2" height="1" fill="#ffe14d" />
      <rect x="50" y="27" width="2" height="1" fill="#ff6b9d" />

      {/* Cornija entre andar 1 e 2 */}
      <rect x="4" y="32" width="62" height="2" fill="#88cc00" />

      {/* ===== ANDAR 2 ===== */}
      <rect x="17" y="37" width="10" height="14" fill="#66aa00" />
      <rect x="18" y="38" width="8" height="12" fill="#3b6d11" />

      <rect x="30" y="37" width="10" height="14" fill="#66aa00" />
      <rect x="31" y="38" width="8" height="12" className={styles.flickerC} fill="#aaff00" />

      <rect x="43" y="37" width="10" height="14" fill="#66aa00" />
      <rect x="44" y="38" width="8" height="12" fill="#3b6d11" />

      {/* Floreiras do andar 2 */}
      <rect x="17" y="51" width="10" height="3" fill="#4d7200" />
      <rect x="18" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="21" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="24" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="18" y="48" width="2" height="1" fill="#ff6b9d" />
      <rect x="21" y="48" width="2" height="1" fill="#ffe14d" />
      <rect x="24" y="48" width="2" height="1" fill="#ff6b9d" />

      <rect x="30" y="51" width="10" height="3" fill="#4d7200" />
      <rect x="31" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="34" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="37" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="31" y="48" width="2" height="1" fill="#ffe14d" />
      <rect x="34" y="48" width="2" height="1" fill="#ff6b9d" />
      <rect x="37" y="48" width="2" height="1" fill="#ffe14d" />

      <rect x="43" y="51" width="10" height="3" fill="#4d7200" />
      <rect x="44" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="47" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="50" y="49" width="2" height="2" fill="#3b6d11" />
      <rect x="44" y="48" width="2" height="1" fill="#ff6b9d" />
      <rect x="47" y="48" width="2" height="1" fill="#ffe14d" />
      <rect x="50" y="48" width="2" height="1" fill="#ff6b9d" />

      {/* Cornija entre andar 2 e 3 */}
      <rect x="4" y="53" width="62" height="2" fill="#88cc00" />

      {/* ===== ANDAR 3 ===== */}
      <rect x="17" y="58" width="10" height="14" fill="#66aa00" />
      <rect x="18" y="59" width="8" height="12" className={styles.flickerA} fill="#aaff00" />

      <rect x="30" y="58" width="10" height="14" fill="#66aa00" />
      <rect x="31" y="59" width="8" height="12" fill="#3b6d11" />

      <rect x="43" y="58" width="10" height="14" fill="#66aa00" />
      <rect x="44" y="59" width="8" height="12" className={styles.flickerB} fill="#aaff00" />

      {/* Floreiras do andar 3 */}
      <rect x="17" y="72" width="10" height="3" fill="#4d7200" />
      <rect x="18" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="21" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="24" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="18" y="69" width="2" height="1" fill="#ff6b9d" />
      <rect x="21" y="69" width="2" height="1" fill="#ffe14d" />
      <rect x="24" y="69" width="2" height="1" fill="#ff6b9d" />

      <rect x="30" y="72" width="10" height="3" fill="#4d7200" />
      <rect x="31" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="34" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="37" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="31" y="69" width="2" height="1" fill="#ffe14d" />
      <rect x="34" y="69" width="2" height="1" fill="#ff6b9d" />
      <rect x="37" y="69" width="2" height="1" fill="#ffe14d" />

      <rect x="43" y="72" width="10" height="3" fill="#4d7200" />
      <rect x="44" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="47" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="50" y="70" width="2" height="2" fill="#3b6d11" />
      <rect x="44" y="69" width="2" height="1" fill="#ff6b9d" />
      <rect x="47" y="69" width="2" height="1" fill="#ffe14d" />
      <rect x="50" y="69" width="2" height="1" fill="#ff6b9d" />

      {/* Entablamento — faixa larga acima do térreo */}
      <rect x="4" y="74" width="62" height="4" fill="#88cc00" />
      <rect x="4" y="78" width="62" height="2" fill="#4d7200" />

      {/* ===== TÉRREO — porta central + janelas flanqueando ===== */}
      <rect x="14" y="82" width="10" height="19" fill="#66aa00" />
      <rect x="15" y="83" width="8" height="17" fill="#3b6d11" />

      <rect x="30" y="82" width="10" height="19" fill="#4d7200" />
      {/* Porta com o topo arredondado (degrau de 1px nos cantos) */}
      <rect x="33" y="84" width="4" height="1" fill="#2f5d00" />
      <rect x="32" y="85" width="6" height="16" fill="#2f5d00" />
      <rect x="34" y="90" width="2" height="6" className={styles.flickerC} fill="#aaff00" />

      <rect x="46" y="82" width="10" height="19" fill="#66aa00" />
      <rect x="47" y="83" width="8" height="17" fill="#3b6d11" />

      {/* Calçada */}
      <rect x="2" y="101" width="66" height="2" fill="#3b6d11" />
    </svg>
  )
}
