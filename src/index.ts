/* eslint-disable @typescript-eslint/no-explicit-any */

namespace SequenceUtils
{
	export function Number(Sequence: NumberSequence, Time: number): number {
		Time = math.clamp(Time === 1 ? Time : Time % 1, 0, 1);

		if (Time === 0) {
			return Sequence.Keypoints[0].Value;
		} else if (Time === 1) {
			return Sequence.Keypoints[(Sequence.Keypoints.size() - 1)].Value;
		};

		for (const Index of $range(0, Sequence.Keypoints.size() - 1)) {
			const Current = Sequence.Keypoints[Index], Next = Sequence.Keypoints[(Index + 1)];

			if (Time >= Current.Time && Time < Next.Time) {
				const Alpha = (Time - Current.Time) / (Next.Time - Current.Time);

				return Current.Value + (Next.Value - Current.Value) * Alpha;
			};
		};

		return 0;
	};

	export function Color(Sequence: ColorSequence, Time: number): Color3 {
		Time = math.clamp(Time === 1 ? Time : Time % 1, 0, 1);

		if (Time === 0) {
			return Sequence.Keypoints[0].Value;

		} else if (Time === 1) {
			return Sequence.Keypoints[(Sequence.Keypoints.size() - 1)].Value;
		};

		for (const Index of $range(0, Sequence.Keypoints.size() - 1)) {
			const Current = Sequence.Keypoints[Index], Next = Sequence.Keypoints[(Index + 1)];

			if (Time >= Current.Time && Time < Next.Time) {
				const Alpha = (Time - Current.Time) / (Next.Time - Current.Time);

				return Current.Value.Lerp(Next.Value, Alpha);
			};
		};

		return new Color3(1, 1, 1);
	};
}

export default SequenceUtils;