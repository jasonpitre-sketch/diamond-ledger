export type Scale3 = number // 0.0 -> 1.0

export interface PlayerIntelScores {
  bio: {
    snapshot: {
      body: Scale3
      handedness: Scale3
      age: Scale3
      draftContext: Scale3
    }

    scout: {
      archetype: Scale3
      development: Scale3
      frame: Scale3
      athleticism: Scale3
      projection: Scale3
    }

    analyst: {
      service: Scale3
      flexibility: Scale3
      health: Scale3
      pedigree: Scale3
      development: Scale3
      organization: Scale3
      risk: Scale3
      value: Scale3
    }
  }

  scout: {
    snapshot: {
      primaryTool: Scale3
      role: Scale3
      build: Scale3
      risk: Scale3
    }

    scout: ScoutToolScores

    analyst: {
      ceiling: Scale3
      floor: Scale3
      roleLikelihood: Scale3
      trend: Scale3
      volatility: Scale3
      compQuality: Scale3
      organizationFit: Scale3
      riskTrend: Scale3
    }
  }

  career: {
    snapshot: {
      pedigree: Scale3
      path: Scale3
      organization: Scale3
      eta: Scale3
    }

    scout: {
      pedigree: Scale3
      path: Scale3
      organization: Scale3
      eta: Scale3
      track: Scale3
    }

    analyst: {
      ceiling: Scale3
      value: Scale3
      ascent: Scale3
      setbacks: Scale3
      recovery: Scale3
      organization: Scale3
      arc: Scale3
      longValue: Scale3
    }
  }
}

export type ScoutToolScores =
  | {
      kind: "pitcher"
      fastball: Scale3
      breakingBall: Scale3
      offspeed: Scale3
      command: Scale3
      overall: Scale3
    }
  | {
      kind: "hitter"
      hit: Scale3
      power: Scale3
      run: Scale3
      arm: Scale3
      field: Scale3
    }
